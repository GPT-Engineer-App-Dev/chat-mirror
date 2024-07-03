import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@/components/ui/tooltip";
import { Send, Paperclip, Smile } from "lucide-react";

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      timestamp: "10:30 AM",
      messages: [
        { id: 1, text: "Hey, how are you?", sender: "John Doe", timestamp: "10:30 AM" },
        { id: 2, text: "I'm good, thanks!", sender: "You", timestamp: "10:32 AM" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Let's catch up later.",
      timestamp: "9:15 AM",
      messages: [
        { id: 1, text: "Let's catch up later.", sender: "Jane Smith", timestamp: "9:15 AM" },
      ],
    },
  ]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedChats = chats.map((chat) =>
      chat.id === selectedChat.id
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );

    setChats(updatedChats);
    setMessage("");
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-1/4 border-r">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Telegram Clone</h2>
          <Button className="mt-4 w-full">New Chat</Button>
        </div>
        <div className="p-4">
          <Input placeholder="Search..." />
        </div>
        <ScrollArea className="h-[calc(100vh-160px)]">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handleChatClick(chat)}
            >
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src="https://placehold.co/40x40" alt={chat.name} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{chat.name}</h3>
                  <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                </div>
                <span className="ml-auto text-xs text-gray-400">{chat.timestamp}</span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src="https://placehold.co/40x40" alt={selectedChat.name} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedChat.name}</h3>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
              <Button variant="outline">Settings</Button>
            </div>
            <ScrollArea className="flex-1 p-4">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 p-2 rounded-lg ${
                    msg.sender === "You" ? "bg-blue-100 self-end" : "bg-gray-100"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs text-gray-400">{msg.timestamp}</span>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 border-t flex items-center">
              <Button variant="outline" className="mr-2">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="mr-2">
                <Smile className="h-5 w-5" />
              </Button>
              <Input
                className="flex-1 mr-2"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>

      {/* Right Panel (Optional) */}
      {selectedChat && (
        <div className="w-1/4 border-l p-4">
          <Card>
            <CardHeader>
              <Avatar className="mr-4">
                <AvatarImage src="https://placehold.co/80x80" alt={selectedChat.name} />
                <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{selectedChat.name}</CardTitle>
              <p className="text-sm text-gray-500">Online</p>
            </CardHeader>
            <CardContent>
              <p>Phone: +1234567890</p>
              <p>Bio: Lorem ipsum dolor sit amet.</p>
            </CardContent>
          </Card>
          <Separator className="my-4" />
          <h3 className="text-lg font-semibold mb-2">Shared Media</h3>
          <div className="grid grid-cols-3 gap-2">
            <img src="https://placehold.co/100x100" alt="Media" />
            <img src="https://placehold.co/100x100" alt="Media" />
            <img src="https://placehold.co/100x100" alt="Media" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
