"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, Circle } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState("1")
  const [newMessage, setNewMessage] = useState("")

  const mockChats = [
    {
      id: "1",
      name: "Sarah Martinez",
      avatar: "/placeholder.svg",
      lastMessage: "Thanks for the university application tips!",
      timestamp: "2 min ago",
      unread: 2,
      isOnline: true,
      country: "Mexico",
    },
    {
      id: "2",
      name: "Alex Kim",
      avatar: "/placeholder.svg",
      lastMessage: "The scholarship deadline is next week",
      timestamp: "1 hour ago",
      unread: 0,
      isOnline: false,
      country: "South Korea",
    },
    {
      id: "3",
      name: "Emma Liu",
      avatar: "/placeholder.svg",
      lastMessage: "London is amazing! You should definitely apply",
      timestamp: "3 hours ago",
      unread: 1,
      isOnline: true,
      country: "China",
    },
    {
      id: "4",
      name: "Study Group - CS Masters",
      avatar: "/placeholder.svg",
      lastMessage: "Meeting tomorrow at 3 PM EST",
      timestamp: "1 day ago",
      unread: 0,
      isOnline: false,
      isGroup: true,
    },
  ]

  const mockMessages = [
    {
      id: "1",
      senderId: "2",
      senderName: "Sarah Martinez",
      content:
        "Hi! I saw your post about Canadian university applications. Do you have any specific tips for computer science programs?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: "2",
      senderId: "1",
      senderName: "You",
      content:
        "Hi Sarah! Yes, I'd be happy to help. For CS programs in Canada, make sure to highlight any programming projects or internships you've done.",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: "3",
      senderId: "2",
      senderName: "Sarah Martinez",
      content: "That's great advice! I have a few projects on GitHub. Should I mention them in my personal statement?",
      timestamp: "10:35 AM",
      isOwn: false,
    },
    {
      id: "4",
      senderId: "1",
      senderName: "You",
      content:
        "GitHub projects are perfect for demonstrating your coding skills. Also, if you have any contributions to open source projects, definitely include those too.",
      timestamp: "10:37 AM",
      isOwn: true,
    },
    {
      id: "5",
      senderId: "2",
      senderName: "Sarah Martinez",
      content: "Thanks for the university application tips!",
      timestamp: "10:40 AM",
      isOwn: false,
    },
  ]

  const selectedChatData = mockChats.find((chat) => chat.id === selectedChat)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-pink-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* Chat List Sidebar */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold mb-3">Messages</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto">
                {mockChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === chat.id ? "bg-cyan-50 border-r-2 border-r-cyan-500" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {chat.isGroup
                              ? "CS"
                              : chat.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {chat.isOnline && !chat.isGroup && (
                          <Circle className="absolute -bottom-1 -right-1 w-3 h-3 fill-green-500 text-green-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{chat.name}</h3>
                          <span className="text-xs text-gray-500">{chat.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <Badge className="ml-2 bg-cyan-500 text-white text-xs px-2 py-1">{chat.unread}</Badge>
                          )}
                        </div>
                        {!chat.isGroup && <p className="text-xs text-gray-400">{chat.country}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedChatData ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedChatData.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {selectedChatData.isGroup
                              ? "CS"
                              : selectedChatData.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {selectedChatData.isOnline && !selectedChatData.isGroup && (
                          <Circle className="absolute -bottom-1 -right-1 w-3 h-3 fill-green-500 text-green-500" />
                        )}
                      </div>
                      <div>
                        <h2 className="font-semibold">{selectedChatData.name}</h2>
                        {selectedChatData.isOnline && !selectedChatData.isGroup ? (
                          <p className="text-sm text-green-600">Online</p>
                        ) : !selectedChatData.isGroup ? (
                          <p className="text-sm text-gray-500">Last seen 2 hours ago</p>
                        ) : (
                          <p className="text-sm text-gray-500">5 members</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs lg:max-w-md ${message.isOwn ? "order-2" : "order-1"}`}>
                          {!message.isOwn && (
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="text-xs">SM</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-500">{message.senderName}</span>
                            </div>
                          )}
                          <div
                            className={`px-4 py-2 rounded-lg ${
                              message.isOwn ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? "text-right" : "text-left"}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button onClick={handleSendMessage} size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
