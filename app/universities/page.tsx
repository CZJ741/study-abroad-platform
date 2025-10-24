"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Building, Database, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { UniversityCard } from "@/components/university-card"
import { Navigation } from "@/components/navigation"
import { getSchools, type School } from "@/lib/api"

const regions = ["All Regions", "Beijing", "Shanghai", "Guangdong", "Zhejiang", "Jiangsu", "Hubei", "Sichuan"]
const types = ["All Types", "Public", "Private", "Comprehensive", "Medical", "Language", "Normal"]
const subjects = [
  "All Subjects",
  "Business",
  "Computer Science",
  "Engineering",
  "Medicine",
  "Law",
  "Arts",
  "Natural Sciences",
  "Economics",
  "International Relations",
]
// 定义学校类型
export default function UniversitiesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedSubject, setSelectedSubject] = useState("All Subjects")

  // 默认排序方式
  const [sortBy, setSortBy] = useState("name")

  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isRealData, setIsRealData] = useState(false)

  const fetchSchools = async (page = 1) => {
    setLoading(true)

    console.log("[v0] Fetching schools with params:", { page, searchQuery, selectedRegion, selectedType })

    const params = {
      page,
      limit: 400, //一页显示的学校数量
      search: searchQuery || undefined,
      location: selectedRegion !== "All Regions" ? selectedRegion : undefined,
      type: selectedType !== "All Types" ? selectedType : undefined,
    }

    
    const response = await getSchools(params)

    if (response.error && !response.data) {
      setError(response.error)
      setSchools([])
      setIsRealData(false)
    } else if (response.data) {
      console.log("[v0] Received schools data:", response.data.schools.length, "schools")
      setIsRealData(response.data.isRealData || false)
      setError(null)

      // 将 API 数据转换为前端 University 类型
      const transformedSchools = response.data.schools.map((school) => ({
        id: school.id,
        name: school.school_name,
        location: school.location,
        country: "China",
        type: school.attribute || school.type,
        established: 1900,
        ranking: {
          qs: Math.floor(Math.random() * 100) + 1,
          times: Math.floor(Math.random() * 100) + 1,
          arwu: Math.floor(Math.random() * 100) + 1,
        },
        logo: "/placeholder.svg?height=80&width=80",
        image: "/placeholder.svg?height=200&width=400",
        description: school.brief_intro || school.introduction || "A prestigious university in China",
        totalStudents: Math.floor(Math.random() * 50000) + 10000,
        internationalStudents: Math.floor(Math.random() * 20) + 5,
        acceptanceRate: Math.floor(Math.random() * 10) + 1,
        averageFees: {
          undergraduate: Number.parseInt(school.min_tuition?.replace(/[^\d]/g, "") || "25000"),
          postgraduate: Number.parseInt(school.max_tuition?.replace(/[^\d]/g, "") || "30000"),
          currency: "CNY",
        },
        popularSubjects: school.available_levels?.split(",") || ["Engineering", "Business"],
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 3000) + 500,
        campuses: ["Main Campus"],
        facilities: ["Library", "Research Labs", "Student Housing"],
        scholarships: Math.floor(Math.random() * 30) + 10,
      }))

      setSchools(transformedSchools)
      setTotalPages(response.data.totalPages)
      setCurrentPage(response.data.page)
    }

    setLoading(false)
  }

  // 每当搜索查询或过滤条件变化时，重新获取学校列表
  useEffect(() => {
    fetchSchools(1)
  }, [searchQuery, selectedRegion, selectedType])

  const filteredSchools = schools.filter((school) => {
    const matchesSubject =
      selectedSubject === "All Subjects" ||
      school.popularSubjects.some((subject) => subject.toLowerCase().includes(selectedSubject.toLowerCase()))
    return matchesSubject
  })

  // 根据排序选项对学校进行排序
  const sortedSchools = [...filteredSchools].sort((a, b) => {
    switch (sortBy) {
      case "ranking":
        return a.ranking.qs - b.ranking.qs
      case "name":
        return a.name.localeCompare(b.name)
      case "students":
        return b.totalStudents - a.totalStudents
      case "rating":
        return b.rating - a.rating
      case "fees-low":
        return a.averageFees.undergraduate - b.averageFees.undergraduate
      case "fees-high":
        return b.averageFees.undergraduate - a.averageFees.undergraduate
      default:
        return 0
    }
  })

  // 处理用户点击“保存大学”时的逻辑
  const handleSaveUniversity = (universityId: number) => {
    console.log("[v0] Saving university:", universityId)
  }

  // 处理用户点击“查看课程”时的导航逻辑
  const handleViewCourses = (universityId: number) => {
    router.push(`/courses?university=${universityId}`)
  }
  // 处理用户点击“查看大学详情”时的导航逻辑
  const handleViewDetails = (universityId: number) => {
    router.push(`/universities/${universityId}`)
  }

  // 处理加载更多学校的逻辑
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      fetchSchools(currentPage + 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">Explore Top Universities in China</h1>
              <p className="text-muted-foreground">
                Discover world-class universities and find your perfect academic home
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isRealData ? "default" : "secondary"} className="flex items-center gap-1">
                {isRealData ? (
                  <>
                    <Wifi className="h-3 w-3" />
                    实时数据
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3" />
                    演示数据
                  </>
                )}
              </Badge>
              {!isRealData && (
                <Button variant="outline" size="sm" onClick={() => fetchSchools(1)} className="text-xs">
                  重试连接
                </Button>
              )}
            </div>
          </div>
        </div>

        {!isRealData && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                <strong>注意：</strong> 当前显示的是演示数据。请确保Python后端服务器正在运行在 http://studyapi.vgit.cn
              </p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for universities, locations, or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
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
                      <SheetTitle>Filter Universities</SheetTitle>
                      <SheetDescription>Refine your search to find the perfect university</SheetDescription>
                    </SheetHeader>
                    <UniversityFilters
                      selectedRegion={selectedRegion}
                      setSelectedRegion={setSelectedRegion}
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                      selectedSubject={selectedSubject}
                      setSelectedSubject={setSelectedSubject}
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
                    <UniversityFilters
                      selectedRegion={selectedRegion}
                      setSelectedRegion={setSelectedRegion}
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                      selectedSubject={selectedSubject}
                      setSelectedSubject={setSelectedSubject}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {loading ? "Loading..." : `Showing ${sortedSchools.length} universities`}
                {error && sortedSchools.length === 0 && <span className="text-red-500 ml-2">Error: {error}</span>}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="ranking">Best Ranking</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>

                  <SelectItem value="fees-low">Lowest Fees</SelectItem>
                  <SelectItem value="fees-high">Highest Fees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading universities...</p>
              </div>
            )}

            {!loading && (
              <div className="space-y-6">
                {sortedSchools.map((university) => (
                  <UniversityCard
                    key={university.id}
                    university={university}
                    onSave={handleSaveUniversity}
                    onViewCourses={handleViewCourses}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}

            {!loading && sortedSchools.length > 0 && currentPage < totalPages && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" onClick={handleLoadMore}>
                  Load More Universities
                </Button>
              </div>
            )}

            {!loading && sortedSchools.length === 0 && !error && (
              <div className="text-center py-12">
                <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No universities found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedRegion("All Regions")
                    setSelectedType("All Types")
                    setSelectedSubject("All Subjects")
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

function UniversityFilters({
  selectedRegion,
  setSelectedRegion,
  selectedType,
  setSelectedType,
  selectedSubject,
  setSelectedSubject,
}: {
  selectedRegion: string
  setSelectedRegion: (value: string) => void
  selectedType: string
  setSelectedType: (value: string) => void
  selectedSubject: string
  setSelectedSubject: (value: string) => void
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium">Region</h4>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-medium">University Type</h4>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-medium">Popular Subject</h4>
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

      <div className="space-y-3">
        <h4 className="font-medium">Quick Filters</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="top-100" />
            <label htmlFor="top-100" className="text-sm">
              Top 100 Ranked
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="scholarships-available" />
            <label htmlFor="scholarships-available" className="text-sm">
              Scholarships Available
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="high-international" />
            <label htmlFor="high-international" className="text-sm">
              High International %
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
