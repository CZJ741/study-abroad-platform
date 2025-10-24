"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Heart,
  Award,
  Settings,
  Bell,
  Calendar,
  MapPin,
  GraduationCap,
  TrendingUp,
  Users,
  MessageCircle,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [profileCompletion, setProfileCompletion] = useState(0)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      // 计算用户资料完成度
      let completion = 0
      if (user.firstName && user.lastName) completion += 20
      if (user.email) completion += 20
      if (user.country) completion += 20
      if (user.preferences.subjects.length > 0) completion += 20
      if (user.preferences.countries.length > 0) completion += 20
      setProfileCompletion(completion)
    }
  }, [user])
  // 显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }
  // 模拟的数据
  const mockSavedCourses = [
    {
      id: "1",
      title: "Master of Computer Science",
      university: "University of Toronto",
      country: "Canada",
      duration: "2 years",
      tuition: "$45,000/year",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "MBA in International Business",
      university: "London Business School",
      country: "United Kingdom",
      duration: "1 year",
      tuition: "$65,000/year",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const mockApplications = [
    {
      id: "1",
      course: "Master of Computer Science",
      university: "University of Toronto",
      status: "In Review",
      deadline: "2024-03-15",
      progress: 75,
    },
    {
      id: "2",
      course: "MBA in International Business",
      university: "London Business School",
      status: "Documents Pending",
      deadline: "2024-04-01",
      progress: 45,
    },
  ]

  const mockRecommendations = [
    {
      id: "1",
      title: "Master of Data Science",
      university: "University of Melbourne",
      country: "Australia",
      match: 95,
      reason: "Based on your Computer Science interest",
    },
    {
      id: "2",
      title: "MSc Artificial Intelligence",
      university: "University of Edinburgh",
      country: "United Kingdom",
      match: 88,
      reason: "Popular among students from your country",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-cyan-600">
              StudyAbroad
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.firstName}!</h1>
          <p className="text-gray-600">
            Track your applications, discover new opportunities, and connect with fellow students.
          </p>
        </div>

        {/* Profile Completion */}
        {profileCompletion < 100 && (
          <Card className="mb-8 border-l-4 border-l-pink-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-pink-500" />
                Complete Your Profile
              </CardTitle>
              <CardDescription>Complete your profile to get better recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Progress value={profileCompletion} className="flex-1" />
                <span className="text-sm font-medium">{profileCompletion}%</span>
              </div>
              <Button className="mt-4 bg-transparent" variant="outline" size="sm">
                Complete Profile
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="saved">Saved Courses</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="recommendations">For You</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saved Courses</CardTitle>
                  <Heart className="h-4 w-4 text-pink-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSavedCourses.length}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Applications</CardTitle>
                  <BookOpen className="h-4 w-4 text-cyan-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockApplications.length}</div>
                  <p className="text-xs text-muted-foreground">1 in review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scholarships</CardTitle>
                  <Award className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Available for you</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <Users className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+12% from last week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        You saved <strong>Master of Computer Science</strong>
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        Application status updated for <strong>MBA Program</strong>
                      </p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New scholarship opportunity available</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Courses Tab */}
          <TabsContent value="saved" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSavedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      {course.university}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {course.country}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="text-lg font-semibold text-cyan-600">{course.tuition}</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        Apply Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="space-y-4">
              {mockApplications.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{app.course}</CardTitle>
                        <CardDescription>{app.university}</CardDescription>
                      </div>
                      <Badge variant={app.status === "In Review" ? "default" : "secondary"}>{app.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Application Progress</span>
                        <span>{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} />
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Deadline: {new Date(app.deadline).toLocaleDateString()}
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <div className="space-y-4">
              {mockRecommendations.map((rec) => (
                <Card key={rec.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{rec.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          {rec.university} • {rec.country}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{rec.match}% match</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{rec.reason}</p>
                    <div className="flex gap-2">
                      <Button size="sm">Learn More</Button>
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Recent Discussions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-l-cyan-500 pl-4">
                      <h4 className="font-medium">Tips for Canadian University Applications</h4>
                      <p className="text-sm text-gray-600">Started by Sarah M. • 12 replies</p>
                    </div>
                    <div className="border-l-4 border-l-pink-500 pl-4">
                      <h4 className="font-medium">Scholarship Application Deadlines</h4>
                      <p className="text-sm text-gray-600">Started by Alex K. • 8 replies</p>
                    </div>
                    <div className="border-l-4 border-l-green-500 pl-4">
                      <h4 className="font-medium">Life in London as an International Student</h4>
                      <p className="text-sm text-gray-600">Started by Emma L. • 15 replies</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    View All Discussions
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Connect with Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">Sarah Martinez</h4>
                        <p className="text-sm text-gray-600">Computer Science • University of Toronto</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>AK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">Alex Kim</h4>
                        <p className="text-sm text-gray-600">MBA • London Business School</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>EL</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">Emma Liu</h4>
                        <p className="text-sm text-gray-600">Engineering • University of Melbourne</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    Find More Students
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
