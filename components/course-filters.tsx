"use client"

import { Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

const subjects = ["All Subjects", "Business", "Computer Science", "Engineering", "Medicine", "Finance", "Data Science"]
const countries = ["All Countries", "Australia", "Canada", "UK", "USA", "Switzerland"]
const levels = ["All Levels", "Undergraduate", "Postgraduate", "PhD"]

// 课程过滤组件，允许用户根据不同条件筛选课程
interface CourseFiltersProps {
  selectedSubject: string
  setSelectedSubject: (value: string) => void
  selectedCountry: string
  setSelectedCountry: (value: string) => void
  selectedLevel: string
  setSelectedLevel: (value: string) => void
  feeRange: number[]
  setFeeRange: (value: number[]) => void
}
// 课程过滤组件，允许用户根据不同条件筛选课程
export function CourseFilters({
  selectedSubject,
  setSelectedSubject,
  selectedCountry,
  setSelectedCountry,
  selectedLevel,
  setSelectedLevel,
  feeRange,
  setFeeRange,
}: CourseFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Subject Filter */}
          <div className="space-y-3">
            <h4 className="font-medium">Subject</h4>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Country Filter */}
          <div className="space-y-3">
            <h4 className="font-medium">Country</h4>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Level Filter */}
          <div className="space-y-3">
            <h4 className="font-medium">Study Level</h4>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Fee Range Filter */}
          <div className="space-y-3">
            <h4 className="font-medium">Annual Fee Range</h4>
            <div className="px-2">
              <Slider
                value={feeRange}
                onValueChange={setFeeRange}
                max={100000}
                min={0}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${feeRange[0].toLocaleString()}</span>
                <span>${feeRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quick Filters */}
          <div className="space-y-3">
            <h4 className="font-medium">Quick Filters</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="scholarships" />
                <label htmlFor="scholarships" className="text-sm">
                  Scholarships Available
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="english" />
                <label htmlFor="english" className="text-sm">
                  Taught in English
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="online" />
                <label htmlFor="online" className="text-sm">
                  Online Options
                </label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
