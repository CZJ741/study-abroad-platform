"use client"
//课程列表页

import { useState, useEffect } from "react"
import { Search, Filter, GraduationCap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CourseCard } from "@/components/course-card"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import Link from "next/link"

// API base URL from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://studyapi.vgit.cn';

// Subjects, countries, levels (these can be fetched dynamically if needed)
const subjects = ["All Subjects", "Business", "Computer Science", "Engineering", "Medicine", "Finance", "Data Science"]
const countries = ["All Countries", "Australia", "Canada", "UK", "USA", "Switzerland"]
const levels = ["All Levels", "Undergraduate", "Postgraduate", "PhD"]

export default function CoursesPage() {
  const { user, saveCourse, addToComparison } = useAuth()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All Subjects")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [feeRange, setFeeRange] = useState([0, 100000])
  const [sortBy, setSortBy] = useState("relevance")

  const [courses, setCourses] = useState([])
  const [totalCourses, setTotalCourses] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(1000) // Adjust limit as needed
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({
          search: searchQuery,
          course_type: selectedLevel !== "All Levels" ? selectedLevel : '',
          language: '', // Add if needed
          page: page.toString(),
          limit: limit.toString(),
        })

        // Add more filters if backend supports (e.g., subject, country, fee)
        // Note: Backend may need extension for feeRange, subject, country
        if (selectedSubject !== "All Subjects") params.append('subject', selectedSubject) // Assuming backend supports
        if (selectedCountry !== "All Countries") params.append('location', selectedCountry)
        // Fee range: Backend doesn't support yet; filter frontend or extend API

        const response = await fetch(`${API_URL}/api/programs?${params.toString()}`)
        if (!response.ok) throw new Error('Failed to fetch courses')
        const data = await response.json()

        // Map backend fields to frontend expected (e.g., course_name -> title)
        const mappedCourses = data.programs.map(course => ({
          id: course.id,
          title: course.course_name,
          university: course.school_name,
          location: course.location,
          country: course.location.split(', ')[1] || '', // Assume location format "City, Country"
          level: course.course_type,
          subject: '', // Add if backend provides
          duration: course.duration,
          fee: parseInt(course.tuition) || 0,
          currency: 'RMB', // Assume or from backend
          rating: 4.5, // Mock or add to backend
          reviews: 100, // Mock or add
          description: course.entry_requirements?.slice(0, 100) + '...', // Truncate
          startDate: course.start_date,
          applicationDeadline: course.deadline,
          requirements: course.entry_requirements?.split('\n') || [],
        }))

        setCourses(prev => page === 1 ? mappedCourses : [...prev, ...mappedCourses])
        setTotalCourses(data.total || mappedCourses.length) // If backend provides total
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [searchQuery, selectedSubject, selectedCountry, selectedLevel, feeRange, page]) // Dependencies trigger refetch

  // Client-side sorting (since backend may not support all sorts)
  const sortedCourses = [...courses].sort((a, b) => {
    switch (sortBy) {
      case "fee-low":
        return a.fee - b.fee
      case "fee-high":
        return b.fee - a.fee
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  // Client-side fee filter (extend backend if needed)
  const filteredCourses = sortedCourses.filter(course => course.fee >= feeRange[0] && course.fee <= feeRange[1])

  // Handlers (unchanged)
  const handleSaveCourse = (courseId: number) => {
    if (user) {
      saveCourse(courseId.toString())
    } else {
      router.push("/auth/signin")
    }
  }

  const handleCompareCourse = (courseId: number) => {
    if (user) {
      addToComparison(courseId.toString())
    } else {
      router.push("/auth/signin")
    }
  }

  const handleViewDetails = (courseId: number) => {
    router.push(`/courses/${courseId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation (unchanged) */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <img src="/logo.png" alt="Study in China Logo" className="h-8 w-auto" />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="/courses" className="text-primary font-medium">
                Find Courses
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Universities
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Scholarships
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Advice
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header (unchanged) */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif mb-2">Find Your Perfect Course</h1>
          <p className="text-muted-foreground">Discover thousands of courses from top universities worldwide</p>
        </div>

        {/* Search Bar (unchanged) */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for courses, universities, or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (unchanged) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="lg:hidden mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filter Courses</SheetTitle>
                      <SheetDescription>Refine your search to find the perfect course</SheetDescription>
                    </SheetHeader>
                    <FilterContent
                      selectedSubject={selectedSubject}
                      setSelectedSubject={setSelectedSubject}
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                      selectedLevel={selectedLevel}
                      setSelectedLevel={setSelectedLevel}
                      feeRange={feeRange}
                      setFeeRange={setFeeRange}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              <div className="hidden lg:block">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FilterContent
                      selectedSubject={selectedSubject}
                      setSelectedSubject={setSelectedSubject}
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                      selectedLevel={selectedLevel}
                      setSelectedLevel={setSelectedLevel}
                      feeRange={feeRange}
                      setFeeRange={setFeeRange}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredCourses.length} of {totalCourses} courses
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="fee-low">Lowest Fee</SelectItem>
                  <SelectItem value="fee-high">Highest Fee</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Course Cards */}
            {loading ? (
              <div className="text-center py-12">Loading...</div> // Replace with Loading component
            ) : error ? (
              <div className="text-center py-12 text-red-600">{error}</div>
            ) : (
              <div className="space-y-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSave={handleSaveCourse}
                    onCompare={handleCompareCourse}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {!loading && filteredCourses.length < totalCourses && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" onClick={() => setPage(prev => prev + 1)}>
                  Load More Courses
                </Button>
              </div>
            )}

            {/* No Results */}
            {!loading && filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedSubject("All Subjects")
                    setSelectedCountry("All Countries")
                    setSelectedLevel("All Levels")
                    setFeeRange([0, 100000])
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Filter Content Component (unchanged)
function FilterContent({
  selectedSubject,
  setSelectedSubject,
  selectedCountry,
  setSelectedCountry,
  selectedLevel,
  setSelectedLevel,
  feeRange,
  setFeeRange,
}: {
  selectedSubject: string
  setSelectedSubject: (value: string) => void
  selectedCountry: string
  setSelectedCountry: (value: string) => void
  selectedLevel: string
  setSelectedLevel: (value: string) => void
  feeRange: number[]
  setFeeRange: (value: number[]) => void
}) {
  return (
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
          <Slider value={feeRange} onValueChange={setFeeRange} max={100000} min={0} step={5000} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${feeRange[0].toLocaleString()}</span>
            <span>${feeRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Filters (unchanged, but can filter API if extended) */}
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
  )
}
