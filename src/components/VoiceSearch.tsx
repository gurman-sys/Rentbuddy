
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Define the SpeechRecognition interface for TypeScript
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

// Extend the Window interface to include speech recognition
declare global {
  interface Window {
    SpeechRecognition: {
      new(): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new(): SpeechRecognition;
    };
  }
}

interface VoiceSearchProps {
  onVoiceResult: (text: string) => void;
  placeholder?: string;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onVoiceResult, placeholder = "Try saying 'Mic chahiye Delhi mein'" }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'hi-IN'; // Hindi + English support
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onVoiceResult(transcript);
        toast.success(`Voice search: "${transcript}"`);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Voice search failed. Please try again.');
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [onVoiceResult]);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
      toast.info('Listening... Speak now!');
    } else {
      toast.error('Voice search not supported on this device');
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <Button
      variant={isListening ? "destructive" : "outline"}
      size="icon"
      onClick={isListening ? stopListening : startListening}
      disabled={!recognition}
      className="flex-shrink-0"
      title={placeholder}
    >
      {isListening ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : recognition ? (
        <Mic className="w-4 h-4" />
      ) : (
        <MicOff className="w-4 h-4" />
      )}
    </Button>
  );
};

export default VoiceSearch;
