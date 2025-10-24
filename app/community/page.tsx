"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  MessageCircle,
  Users,
  Plus,
  Search,
  Heart,
  Share2,
  BookmarkPlus,
  Filter,
  TrendingUp,
  Clock,
  MapPin,
  GraduationCap,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [searchQuery, setSearchQuery] = useState("")

  const mockDiscussions = [
    {
      id: "1",
      title: "Tips for Canadian University Applications",
      content:
        "I'm applying to several Canadian universities and would love to hear from students who have been through the process...",
      author: {
        name: "Sarah Martinez",
        avatar: "/placeholder.svg",
        country: "Mexico",
        university: "Applying to University of Toronto",
      },
      replies: 12,
      likes: 24,
      views: 156,
      tags: ["Canada", "Applications", "Tips"],
      createdAt: "2 hours ago",
      isPopular: true,
    },
    {
      id: "2",
      title: "Scholarship Application Deadlines - Don't Miss These!",
      content: "Here's a comprehensive list of upcoming scholarship deadlines for international students...",
      author: {
        name: "Alex Kim",
        avatar: "/placeholder.svg",
        country: "South Korea",
        university: "London Business School",
      },
      replies: 8,
      likes: 31,
      views: 203,
      tags: ["Scholarships", "Deadlines", "Financial Aid"],
      createdAt: "1 day ago",
      isPopular: true,
    },
    {
      id: "3",
      title: "Life in London as an International Student",
      content:
        "Just finished my first semester at UCL. Happy to share my experience about accommodation, food, transport...",
      author: {
        name: "Emma Liu",
        avatar: "/placeholder.svg",
        country: "China",
        university: "University College London",
      },
      replies: 15,
      likes: 42,
      views: 287,
      tags: ["UK", "Student Life", "London"],
      createdAt: "3 days ago",
      isPopular: false,
    },
    {
      id: "4",
      title: "IELTS vs TOEFL - Which one should I take?",
      content: "I'm confused about which English proficiency test to take. What are the pros and cons of each?",
      author: {
        name: "Raj Patel",
        avatar: "/placeholder.svg",
        country: "India",
        university: "Applying to Australian Universities",
      },
      replies: 6,
      likes: 18,
      views: 124,
      tags: ["IELTS", "TOEFL", "English Tests"],
      createdAt: "5 days ago",
      isPopular: false,
    },
  ]

  const mockStudents = [
    {
      id: "1",
      name: "Sarah Martinez",
      avatar: "/placeholder.svg",
      country: "Mexico",
      university: "University of Toronto",
      program: "Computer Science",
      year: "1st Year",
      interests: ["Technology", "AI", "Startups"],
      isOnline: true,
    },
    {
      id: "2",
      name: "Alex Kim",
      avatar: "/placeholder.svg",
      country: "South Korea",
      university: "London Business School",
      program: "MBA",
      year: "2nd Year",
      interests: ["Business", "Finance", "Consulting"],
      isOnline: false,
    },
    {
      id: "3",
      name: "Emma Liu",
      avatar: "/placeholder.svg",
      country: "China",
      university: "University College London",
      program: "Engineering",
      year: "3rd Year",
      interests: ["Engineering", "Research", "Innovation"],
      isOnline: true,
    },
    {
      id: "4",
      name: "Raj Patel",
      avatar: "/placeholder.svg",
      country: "India",
      university: "University of Melbourne",
      program: "Data Science",
      year: "2nd Year",
      interests: ["Data Science", "Machine Learning", "Analytics"],
      isOnline: true,
    },
  ]

  const mockEvents = [
    {
      id: "1",
      title: "Virtual University Fair - Canadian Universities",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      attendees: 234,
      type: "Virtual Event",
      description: "Meet representatives from top Canadian universities and learn about their programs.",
    },
    {
      id: "2",
      title: "Scholarship Workshop: Writing Winning Essays",
      date: "March 20, 2024",
      time: "6:00 PM GMT",
      attendees: 156,
      type: "Workshop",
      description: "Learn how to write compelling scholarship essays that stand out.",
    },
    {
      id: "3",
      title: "Student Meetup: London International Students",
      date: "March 25, 2024",
      time: "7:00 PM GMT",
      attendees: 45,
      type: "In-Person",
      description: "Meet fellow international students studying in London.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-pink-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">
            Connect with fellow international students, share experiences, and get advice from the community.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search discussions, students, or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Discussion
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Discussion Feed */}
              <div className="lg:col-span-3 space-y-4">
                {mockDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {discussion.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{discussion.author.name}</h3>
                              {discussion.isPopular && (
                                <Badge variant="secondary" className="text-xs">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="h-3 w-3" />
                              {discussion.author.country}
                              <span>•</span>
                              <GraduationCap className="h-3 w-3" />
                              {discussion.author.university}
                              <span>•</span>
                              <Clock className="h-3 w-3" />
                              {discussion.createdAt}
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg mt-3">{discussion.title}</CardTitle>
                      <CardDescription className="text-gray-600">{discussion.content}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {discussion.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {discussion.replies} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {discussion.likes} likes
                          </span>
                          <span>{discussion.views} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {["University Applications", "Scholarships", "Student Visa", "IELTS/TOEFL", "Student Life"].map(
                        (topic) => (
                          <Button key={topic} variant="ghost" className="w-full justify-start text-sm">
                            #{topic}
                          </Button>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Members</span>
                        <span className="font-semibold">12,456</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Online Now</span>
                        <span className="font-semibold text-green-600">234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Discussions</span>
                        <span className="font-semibold">3,421</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Countries</span>
                        <span className="font-semibold">89</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockStudents.map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {student.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{student.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          {student.country}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <GraduationCap className="h-4 w-4 text-cyan-500" />
                          <span className="font-medium">{student.university}</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">
                          {student.program} • {student.year}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Interests:</p>
                        <div className="flex flex-wrap gap-1">
                          {student.interests.map((interest) => (
                            <Badge key={interest} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          Connect
                        </Button>
                        <Button size="sm" variant="outline">
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription className="mt-2">{event.description}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          event.type === "Virtual Event"
                            ? "default"
                            : event.type === "Workshop"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {event.attendees} attending
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          Join Event
                        </Button>
                        <Button size="sm" variant="outline">
                          Remind Me
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
