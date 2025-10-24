"use client"

import { Star, MapPin, Clock, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface Course {
  id: number
  title: string
  university: string
  location: string
  country: string
  level: string
  subject: string
  duration: string
  fee: number
  currency: string
  rating: number
  reviews: number
  description: string
  startDate: string
  applicationDeadline: string
  requirements: string[]
}

// CourseCard组件，展示课程的关键信息和操作按钮
interface CourseCardProps {
  course: Course
  onSave?: (courseId: number) => void
  onCompare?: (courseId: number) => void
  onViewDetails?: (courseId: number) => void
}

// 课程卡片组件，展示课程信息并提供交互功能
export function CourseCard({ course, onSave, onCompare, onViewDetails }: CourseCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(course.id)
    } else {
      router.push(`/courses/${course.id}`)
    }
  }

  // 处理用户点击大学名称时的导航逻辑
  const handleUniversityClick = () => {
    // Extract university ID from name (in real app, this would be passed as prop)
    const universityId = course.university
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
    router.push(`/universities/${universityId}`)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3
                  className="text-xl font-semibold font-serif leading-tight cursor-pointer hover:text-cyan-600 transition-colors"
                  onClick={handleViewDetails}
                >
                  {course.title}
                </h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onSave?.(course.id)}>
                  <Star className="h-4 w-4" />
                </Button>
              </div>
              <p
                className="text-primary font-medium cursor-pointer hover:text-cyan-700 transition-colors"
                onClick={handleUniversityClick}
              >
                {course.university}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {course.location}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">{course.description}</p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{course.level}</Badge>
              <Badge variant="outline">{course.subject}</Badge>
              <div className="flex items-center text-sm">
                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                {course.rating} ({course.reviews} reviews)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
                Duration: {course.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="h-3 w-3 mr-2 text-muted-foreground" />
                Start: {course.startDate}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {course.currency} ${course.fee.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">per year</p>
            </div>

            <div className="space-y-2">
              <Button className="w-full" onClick={handleViewDetails}>
                View Details
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => onCompare?.(course.id)}>
                Add to Compare
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => onSave?.(course.id)}>
                Save Course
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Requirements:</p>
              <ul className="space-y-1">
                {course.requirements.slice(0, 2).map((req, index) => (
                  <li key={index}>• {req}</li>
                ))}
                {course.requirements.length > 2 && <li>• +{course.requirements.length - 2} more</li>}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
