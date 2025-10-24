"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Star, MapPin, GraduationCap } from "lucide-react"
import Link from "next/link"

// Mock course data (in real app, this would come from API)
const mockCourseDetails = {
  "1": {
    id: 1,
    title: "Master of Business Administration (MBA)",
    university: "University of Melbourne",
    location: "Melbourne, Australia",
    country: "Australia",
    level: "Postgraduate",
    subject: "Business",
    duration: "2 years",
    fee: 45000,
    currency: "AUD",
    rating: 4.8,
    reviews: 156,
    description: "A comprehensive MBA program focusing on global business leadership and innovation.",
    startDate: "February 2024",
    applicationDeadline: "October 2023",
    requirements: ["Bachelor's degree", "GMAT 650+", "IELTS 7.0", "Work experience 3+ years"],
    modules: ["Strategic Management", "Financial Analysis", "Marketing Strategy", "Operations Management"],
    employmentRate: "95%",
    averageSalary: "$120,000",
  },
  "2": {
    id: 2,
    title: "Bachelor of Computer Science",
    university: "University of Toronto",
    location: "Toronto, Canada",
    country: "Canada",
    level: "Undergraduate",
    subject: "Computer Science",
    duration: "4 years",
    fee: 58000,
    currency: "CAD",
    rating: 4.6,
    reviews: 203,
    description: "Cutting-edge computer science program with focus on AI and machine learning.",
    startDate: "September 2024",
    applicationDeadline: "January 2024",
    requirements: ["High school diploma", "Mathematics", "IELTS 6.5", "SAT 1400+"],
    modules: ["Data Structures", "Algorithms", "Machine Learning", "Software Engineering"],
    employmentRate: "92%",
    averageSalary: "$85,000",
  },
}

export default function ComparePage() {
  const { user, isLoading, removeFromComparison, clearComparison } = useAuth()
  const router = useRouter()
  const [comparedCourses, setComparedCourses] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user && user.comparedCourses) {
      const courses = user.comparedCourses
        .map((id) => mockCourseDetails[id as keyof typeof mockCourseDetails])
        .filter(Boolean)
      setComparedCourses(courses)
    }
  }, [user])

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

  const handleRemoveCourse = (courseId: string) => {
    removeFromComparison(courseId)
  }

  const handleClearAll = () => {
    clearComparison()
  }

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
              <Link href="/courses" className="text-gray-600 hover:text-cyan-600">
                Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Courses</h1>
            <p className="text-gray-600">
              Compare up to 4 courses side by side to make the best decision for your future.
            </p>
          </div>
          {comparedCourses.length > 0 && (
            <Button variant="outline" onClick={handleClearAll}>
              Clear All
            </Button>
          )}
        </div>

        {comparedCourses.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses to compare</h3>
            <p className="text-gray-600 mb-4">Add courses from the course listings to start comparing</p>
            <Button asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-w-max">
              {comparedCourses.map((course) => (
                <Card key={course.id} className="w-80 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 z-10"
                    onClick={() => handleRemoveCourse(course.id.toString())}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg leading-tight pr-8">{course.title}</CardTitle>
                    <p className="text-primary font-medium">{course.university}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      {course.location}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {course.currency} ${course.fee.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">per year</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Level:</span>
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span>{course.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          {course.rating}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Employment Rate:</span>
                        <span className="font-medium text-green-600">{course.employmentRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Salary:</span>
                        <span className="font-medium">{course.averageSalary}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Key Modules:</h4>
                      <div className="space-y-1">
                        {course.modules.slice(0, 3).map((module: string, index: number) => (
                          <div key={index} className="text-sm text-gray-600">
                            • {module}
                          </div>
                        ))}
                        {course.modules.length > 3 && (
                          <div className="text-sm text-gray-500">+{course.modules.length - 3} more</div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <div className="space-y-1">
                        {course.requirements.slice(0, 2).map((req: string, index: number) => (
                          <div key={index} className="text-sm text-gray-600">
                            • {req}
                          </div>
                        ))}
                        {course.requirements.length > 2 && (
                          <div className="text-sm text-gray-500">+{course.requirements.length - 2} more</div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button className="w-full" asChild>
                        <Link href={`/courses/${course.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
