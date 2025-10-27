"use client"

//课程详情页

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Share2,
  Heart,
  Download,
  MessageCircle,
  Star,
  MapPin,
  Clock,
  Calendar,
  Users,
  Award,
  DollarSign,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// 模拟的课程数据结构
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://studyapi.vgit.cn';

// 定义课程数据类型
export default function CourseProfilePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isSaved, setIsSaved] = useState(false)
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [feeCalculator, setFeeCalculator] = useState({
    duration: 2,
    livingCosts: 25000,
    scholarships: 0,
  })
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // 从API获取课程详情
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_URL}/api/programs/${courseId}`)
        if (!response.ok) throw new Error('Failed to fetch course details')
        const data = await response.json()

        // 映射API数据到前端课程结构
        const mappedCourse = {
          id: data.program.id,
          title: data.program.course_name,
          university: data.program.school_name,
          location: data.program.location,
          level: data.program.course_type,
          duration: data.program.duration,
          mode: 'On-campus', // Mock or add to backend
          startDates: data.program.start_date ? [data.program.start_date] : [],
          qualification: data.program.course_type,
          tuitionFee: parseInt(data.program.tuition) || 0,
          livingCosts: 25000, // Mock or add
          totalCosts: parseInt(data.program.tuition) + 25000, // Calculate or from backend
          currency: 'RMB',
          rating: 4.6, // Mock
          reviewCount: 234, // Mock
          employmentRate: 95, // Mock
          averageSalary: 85000, // Mock
          image: "/placeholder.svg?height=400&width=800", // Mock
          universityLogo: "/placeholder.svg?height=80&width=80", // Mock
          description: data.program.entry_requirements,
          highlights: [], // Add to backend if needed
          modules: [], // Add to backend
          entryRequirements: {
            academic: data.program.entry_requirements?.split('\n') || [],
            english: [], // Parse from entry_requirements if needed
            additional: [],
          },
          scholarships: [], // Fetch from /api/scholarships if needed
          careers: [], // Mock or add
          reviews: [], // Mock or add separate API
        }

        setCourse(mappedCourse)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  // 切换课程模块的展开/收起状态
  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }
  // 计算总费用
  const calculateTotalCosts = () => {
    const tuition = course?.tuitionFee * feeCalculator.duration || 0
    const living = feeCalculator.livingCosts * feeCalculator.duration
    const total = tuition + living - feeCalculator.scholarships
    return { tuition, living, total }
  }

  // 获取计算后的费用
  const costs = calculateTotalCosts()

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>
  if (!course) return <div className="text-center py-12">Course not found</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation (unchanged) */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => router.push("/")} className="hover:text-cyan-600">
              Home
            </button>
            <span>/</span>
            <button onClick={() => router.push("/courses")} className="hover:text-cyan-600">
              Courses
            </button>
            <span>/</span>
            <button onClick={() => router.push("/courses?country=australia")} className="hover:text-cyan-600">
              Australia
            </button>
            <span>/</span>
            <span className="text-gray-900">Computer Science</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant={isSaved ? "default" : "outline"} size="sm" onClick={() => setIsSaved(!isSaved)}>
                <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={course.universityLogo || "/placeholder.svg"}
                  alt={course.university}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-2">
                    <span className="font-medium">{course.university}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {course.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{course.level}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-gray-500">({course.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            </div>

            {/* Actions Sidebar (unchanged, but adapt fees from course) */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Dialog open={showEnquiryForm} onOpenChange={setShowEnquiryForm}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Enquire Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Course Enquiry</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={enquiryForm.name}
                            onChange={(e) => setEnquiryForm((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={enquiryForm.email}
                            onChange={(e) => setEnquiryForm((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={enquiryForm.phone}
                            onChange={(e) => setEnquiryForm((prev) => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            value={enquiryForm.message}
                            onChange={(e) => setEnquiryForm((prev) => ({ ...prev, message: e.target.value }))}
                            placeholder="Tell us about your study goals..."
                          />
                        </div>
                        <Button className="w-full">Send Enquiry</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Prospectus
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent">
                    Add to Shortlist
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent">
                    Compare Courses
                  </Button>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tuition Fee:</span>
                      <span className="font-medium">
                        {course.currency} ${course.tuitionFee.toLocaleString()}/year
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {course.duration}
                      </span>
                    </div>
                    {/* Add more from course data */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

<Tabs defaultValue="overview" className="relative mr-auto w-full">
  <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="structure">Course Structure</TabsTrigger>
    <TabsTrigger value="entry">Entry Requirements</TabsTrigger>
    <TabsTrigger value="fees">Fees & Funding</TabsTrigger>
    <TabsTrigger value="careers">Careers</TabsTrigger>
  </TabsList>

  <TabsContent value="overview" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>About the Course</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{course.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Duration</div>
            <div className="font-medium">{course.duration}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Study Mode</div>
            <div className="font-medium">{course.mode}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Start Dates</div>
            <div className="font-medium">{course.startDates.join(", ")}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Qualification</div>
            <div className="font-medium">{course.qualification}</div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Why Study This Course?</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {course.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">{highlight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </TabsContent>

  <TabsContent value="structure" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Course Modules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {course.modules.map((yearModule, yearIndex) => (
          <div key={yearIndex}>
            <h3 className="font-semibold mb-4">{yearModule.year}</h3>
            <div className="space-y-4">
              {['semester1', 'semester2'].map((semester) => (
                yearModule[semester] && yearModule[semester].length > 0 && (
                  <div key={semester}>
                    <h4 className="font-medium mb-3 capitalize">{semester.replace('1', ' 1').replace('2', ' 2')}</h4>
                    <div className="space-y-2">
                      {yearModule[semester].map((module, moduleIndex) => {
                        const moduleId = `${yearIndex}-${semester}-${moduleIndex}`
                        const isExpanded = expandedModules.includes(moduleId)
                        return (
                          <div key={moduleIndex} className="border rounded-lg">
                            <button
                              onClick={() => toggleModuleExpansion(moduleId)}
                              className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                            >
                              <div>
                                <div className="font-medium">{module.name}</div>
                                <div className="text-sm text-gray-600">
                                  {module.credits} credits • {module.type}
                                </div>
                              </div>
                              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </button>
                            {isExpanded && (
                              <div className="p-4 border-t bg-gray-50">
                                <p className="text-gray-700">{module.description}</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  </TabsContent>

  <TabsContent value="entry" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Entry Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Academic Requirements</h3>
          <ul className="space-y-2">
            {course.entryRequirements.academic.map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">English Language Requirements</h3>
          <ul className="space-y-2">
            {course.entryRequirements.english.map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Additional Requirements</h3>
          <ul className="space-y-2">
            {course.entryRequirements.additional.map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-cyan-50 p-4 rounded-lg">
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Check Your Eligibility</Button>
        </div>
      </CardContent>
    </Card>
  </TabsContent>

  <TabsContent value="fees" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Fees & Funding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <DollarSign className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {course.currency} ${course.tuitionFee.toLocaleString()}
            </div>
            <div className="text-gray-600">Tuition per year</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Users className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {course.currency} ${course.livingCosts.toLocaleString()}
            </div>
            <div className="text-gray-600">Living costs per year</div>
          </div>
          <div className="text-center p-4 bg-cyan-50 rounded-lg">
            <Award className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-600">
              {course.currency} ${course.totalCosts.toLocaleString()}
            </div>
            <div className="text-gray-600">Total estimated cost</div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Fee Calculator</h3>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label>Study Duration (years)</Label>
              <Slider
                value={[feeCalculator.duration]}
                onValueChange={(value) => setFeeCalculator((prev) => ({ ...prev, duration: value[0] }))}
                max={4}
                min={1}
                step={0.5}
                className="mt-2"
              />
              <div className="text-sm text-gray-600 mt-1">{feeCalculator.duration} years</div>
            </div>

            <div>
              <Label>Annual Living Costs ({course.currency})</Label>
              <Slider
                value={[feeCalculator.livingCosts]}
                onValueChange={(value) => setFeeCalculator((prev) => ({ ...prev, livingCosts: value[0] }))}
                max={40000}
                min={15000}
                step={1000}
                className="mt-2"
              />
              <div className="text-sm text-gray-600 mt-1">
                ${feeCalculator.livingCosts.toLocaleString()}
              </div>
            </div>

            <div>
              <Label>Scholarships ({course.currency})</Label>
              <Slider
                value={[feeCalculator.scholarships]}
                onValueChange={(value) => setFeeCalculator((prev) => ({ ...prev, scholarships: value[0] }))}
                max={50000}
                min={0}
                step={1000}
                className="mt-2"
              />
              <div className="text-sm text-gray-600 mt-1">
                ${feeCalculator.scholarships.toLocaleString()}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tuition Fees:</span>
                <span>${costs.tuition.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Living Costs:</span>
                <span>${costs.living.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Scholarships:</span>
                <span className="text-green-600">-${feeCalculator.scholarships.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Cost:</span>
                <span className="text-cyan-600">${costs.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Available Scholarships</h3>
          <div className="space-y-3">
            {course.scholarships.map((scholarship, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{scholarship.name}</h4>
                  <Badge variant="outline">{scholarship.type}</Badge>
                </div>
                <div className="text-cyan-600 font-semibold">
                  Up to {course.currency} ${scholarship.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </TabsContent>

  <TabsContent value="careers" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Career Prospects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{course.employmentRate}%</div>
            <div className="text-gray-600">Employment Rate</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">${course.averageSalary.toLocaleString()}</div>
            <div className="text-gray-600">Average Starting Salary</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">500+</div>
            <div className="text-gray-600">Industry Partners</div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Popular Career Paths</h3>
          <div className="space-y-3">
            {course.careers.map((career, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{career.title}</h4>
                  <Badge
                    variant={career.demand === "Very High" ? "default" : "secondary"}
                    className={career.demand === "Very High" ? "bg-green-600" : ""}
                  >
                    {career.demand} Demand
                  </Badge>
                </div>
                <div className="text-gray-600">
                  Salary Range: {course.currency} {career.salary}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Alumni Success Stories</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-gray-600">Senior Software Engineer at Google</div>
                <div className="text-sm text-gray-700 mt-1">
                  "The program gave me the technical skills and industry connections I needed to land my
                  dream job."
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs> 
        </div>
      </div>
    </div>
  )
}