import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles,
  Bot,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ChatMessage } from '@/types';

// Pre-defined responses for common questions
const botResponses: Record<string, string> = {
  'document': 'For document submission, you need to upload: 1) Aadhaar/Passport/Birth Certificate, 2) Class 10 & 12 marksheets (self-attested), 3) Fee payment receipt. All files should be in PDF, JPG, or PNG format, max 10MB each.',
  'fee': 'Fee payment details: Account Name: Innov College, Account Number: 123456789, IFSC: INNO0001234, Bank: State Bank of India. After payment, upload the receipt in the Fee Payment task.',
  'hostel': 'Hostel options include: Single sharing, Double sharing, and Triple sharing rooms. Each room has attached bathroom, WiFi, and 24/7 power backup. Mess facilities include veg, non-veg, and special diet options.',
  'course': 'Course registration opens after fee payment. You can select electives based on your department. Check the course catalog in the Course Registration task for available options and prerequisites.',
  'deadline': 'The onboarding deadline is 30 days from your admission date. Complete all 6 tasks before the deadline to secure your seat. Contact admissions if you need an extension.',
  'help': 'I can help you with: document requirements, fee payment details, hostel information, course registration, deadlines, and general onboarding queries. What would you like to know?'
};

const suggestionChips = [
  'Documents needed?',
  'Fee payment',
  'Hostel info',
  'Course registration',
  'Deadline?'
];

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-slate-100 rounded-2xl rounded-bl-none w-fit">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  );
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm EduBot, your AI onboarding assistant. I can help you with document requirements, fee payment, hostel info, courses, and more. What would you like to know?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Check for keywords
    if (lowerMsg.includes('document') || lowerMsg.includes('aadhaar') || lowerMsg.includes('marksheet')) {
      return botResponses.document;
    }
    if (lowerMsg.includes('fee') || lowerMsg.includes('payment') || lowerMsg.includes('money')) {
      return botResponses.fee;
    }
    if (lowerMsg.includes('hostel') || lowerMsg.includes('room') || lowerMsg.includes('accommodation')) {
      return botResponses.hostel;
    }
    if (lowerMsg.includes('course') || lowerMsg.includes('subject') || lowerMsg.includes('elective')) {
      return botResponses.course;
    }
    if (lowerMsg.includes('deadline') || lowerMsg.includes('last date') || lowerMsg.includes('due')) {
      return botResponses.deadline;
    }
    if (lowerMsg.includes('help') || lowerMsg.includes('assist')) {
      return botResponses.help;
    }
    
    // Default response
    return "I'm sorry, I didn't understand that. I can help with questions about documents, fees, hostel, courses, and deadlines. Could you please rephrase or select one of the suggestion chips?";
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    // Generate response
    const responseContent = generateResponse(content);
    
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-amber-accent hover:bg-amber-500 rounded-full shadow-lg shadow-amber-accent/30 flex items-center justify-center transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-4 right-4 z-50 w-[380px] h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="gradient-navy-blue p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-accent rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">EduBot</h3>
                    <Sparkles className="w-4 h-4 text-amber-accent" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-xs text-white/70">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' ? 'bg-brand-blue' : 'bg-amber-accent'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                      message.role === 'user' 
                        ? 'bg-brand-blue text-white rounded-br-none' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-amber-accent rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {showSuggestions && (
              <div className="px-4 py-3 bg-white border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500">Suggested questions:</span>
                  <button 
                    onClick={() => setShowSuggestions(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestionChips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSendMessage(chip)}
                      className="px-3 py-1.5 bg-brand-pale hover:bg-brand-blue/20 text-brand-blue text-xs font-medium rounded-full transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!showSuggestions && (
              <button
                onClick={() => setShowSuggestions(true)}
                className="px-4 py-2 bg-white border-t border-slate-100 text-xs text-slate-500 hover:text-brand-blue flex items-center justify-center gap-1 transition-colors"
              >
                Show suggestions
                <ChevronUp className="w-3 h-3" />
              </button>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2.5 bg-slate-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="w-10 h-10 bg-brand-blue hover:bg-brand-light text-white rounded-xl disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-center text-xs text-slate-400 mt-2">
                EduBot can only answer onboarding-related questions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
