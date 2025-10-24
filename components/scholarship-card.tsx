"use client"

import { Award, MapPin, Calendar, Clock, Users, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Scholarship {
  id: number
  name: string
  provider: string
  country: string
  type: string
  amount: number
  currency: string
  coverage: string
  level: string[]
  subjects: string[]
  description: string
  eligibility: string[]
  applicationDeadline: string
  duration: string
  benefits: string[]
  numberOfAwards: number
  competitiveness: string
  website: string
  requirements: {
    gpa: number
    englishTest: string
    workExperience: string
  }
}
// ScholarshipCard组件，展示奖学金的关键信息和操作按钮
interface ScholarshipCardProps {
  scholarship: Scholarship
  onSave?: (scholarshipId: number) => void
  onCheckEligibility?: (scholarshipId: number) => void
  onViewDetails?: (scholarshipId: number) => void
}
// 奖学金卡片组件，展示奖学金信息并提供交互功能
export function ScholarshipCard({ scholarship, onSave, onCheckEligibility, onViewDetails }: ScholarshipCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold font-serif leading-tight">{scholarship.name}</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onSave?.(scholarship.id)}>
                  <Award className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-primary font-medium">{scholarship.provider}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {scholarship.country}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm">{scholarship.description}</p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{scholarship.coverage} Coverage</Badge>
              <Badge variant="outline">{scholarship.type}</Badge>
              <Badge
                variant={
                  scholarship.competitiveness === "Very High"
                    ? "destructive"
                    : scholarship.competitiveness === "High"
                      ? "default"
                      : "secondary"
                }
              >
                {scholarship.competitiveness} Competition
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                Deadline: {scholarship.applicationDeadline}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
                Duration: {scholarship.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-2 text-muted-foreground" />
                Awards: {scholarship.numberOfAwards}
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-3 w-3 mr-2 text-muted-foreground" />
                Level: {scholarship.level.join(", ")}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Key Benefits:</p>
              <div className="flex flex-wrap gap-1">
                {scholarship.benefits.slice(0, 3).map((benefit, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {benefit}
                  </Badge>
                ))}
                {scholarship.benefits.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{scholarship.benefits.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {scholarship.currency} ${scholarship.amount.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                {scholarship.coverage === "Full" ? "Full funding" : "Per year"}
              </p>
            </div>

            <div className="space-y-2">
              <Button className="w-full" onClick={() => onViewDetails?.(scholarship.id)}>
                View Details
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => onCheckEligibility?.(scholarship.id)}
              >
                Check Eligibility
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => onSave?.(scholarship.id)}>
                Save Scholarship
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Requirements:</p>
              <ul className="space-y-1">
                <li>• GPA: {scholarship.requirements.gpa}+</li>
                <li>• {scholarship.requirements.englishTest}</li>
                <li>• {scholarship.requirements.workExperience}</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
