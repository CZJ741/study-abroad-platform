"use client"

import { Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface University {
  id: number
  name: string
  location: string
  country: string
  type: string
  established: number
  ranking: {
    qs: number
    times: number
    arwu: number
  }
  logo: string
  image: string
  description: string
  totalStudents: number
  internationalStudents: number
  acceptanceRate: number
  averageFees: {
    undergraduate: number
    postgraduate: number
    currency: string
  }
  popularSubjects: string[]
  rating: number
  reviews: number
  campuses: string[]
  facilities: string[]
  scholarships: number
}

// UniversityCard组件，展示大学的关键信息和操作按钮
interface UniversityCardProps {
  university: University
  onSave?: (universityId: number) => void
  onViewCourses?: (universityId: number) => void
  onViewDetails?: (universityId: number) => void
}

// 大学卡片组件，展示大学信息并提供交互功能
export function UniversityCard({ university, onSave, onViewCourses, onViewDetails }: UniversityCardProps) {
  const router = useRouter()

  // 处理用户点击“查看大学详情”时的导航逻辑
  const handleViewUniversity = () => {
    console.log("[v0] University Card - Navigating to university:", university.id)
    router.push(`/universities/${university.id}`)
  }

  // 处理用户点击“查看课程”时的导航逻辑
  const handleViewCourses = () => {
    console.log("[v0] University Card - Navigating to courses for university:", university.id)
    router.push(`/courses?university=${university.id}`)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3
                  className="text-xl font-semibold font-serif leading-tight cursor-pointer hover:text-primary transition-colors"
                  onClick={handleViewUniversity}
                >
                  {university.name}
                </h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onSave?.(university.id)}>
                  <Star className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {university.location}
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <Badge variant="secondary">#{university.ranking.qs} QS Ranking</Badge>
                <Badge variant="outline">{university.type}</Badge>
                {/* <span className="text-muted-foreground">Est. {university.established}</span> */}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm">{university.description}</p>

            <div className="space-y-2">
              <p className="text-sm font-medium">Popular Subjects:</p>
              <div className="flex flex-wrap gap-1">
                {university.popularSubjects.map((subject, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm">
                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                {university.rating} ({university.reviews} reviews)
              </div>
            </div>
          </div>


          <div className="md:col-span-1 space-y-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-lg font-bold text-primary">
                {university.averageFees.currency} ${university.averageFees.undergraduate.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">avg. undergraduate fees</p>
            </div>

            <div className="space-y-2">
              <Button className="w-full" onClick={handleViewUniversity}>
                View University
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleViewCourses}>
                View Courses
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => onSave?.(university.id)}>
                Add to Shortlist
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}