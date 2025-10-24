"use client"

//学校详情页

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  Star,
  MapPin,
  Users,
  Globe,
  BookOpen,
  Calendar,
  DollarSign,
  Building,
  GraduationCap,
  Heart,
  Share2,
  ExternalLink,
  Phone,
  Mail,
  Clock,
  TrendingUp,
  Camera,
  Play,
  Download,
  MessageCircle,
  Award,
  ChevronRight,
  Eye,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"

// 定义后端返回的原始数据类型
interface School {
  id: number;
  school_name: string;
  attribute: string;
  level: string | null;
  type: string | null;
  location: string | null;
  brief_intro: string | null;
  introduction: string | null;
  sid: number;
  base_url: string;
  created_at: string;
  logo_url?: string | null;     
  campus_photos?: string | null;
}

interface Program {
  id: number;
  school_id: number;
  program_url: string;
  course_name: string;
  course_type: string | null;
  start_date: string | null;
  duration: string | null;
  deadline: string | null;
  language: string | null;
  tuition: string | null;
  application_fee: string | null;
  entry_requirements: string | null;
  tel: string | null;
  email: string | null;
  community: string | null;
  created_at: string;
}
// 学费数据类型
interface TuitionFee {
  id: number;
  school_id: number;
  level: string | null;
  fee: string | null;
  created_at: string;
}
// 住宿费数据类型
interface AccommodationFee {
  id: number;
  school_id: number;
  room_type: string | null;
  fee: string | null;
  details_link: string | null;
  created_at: string;
}

interface OtherFee {
  id: number;
  school_id: number;
  item: string | null;
  fee: string | null;
  created_at: string;
}
// 奖学金数据类型
interface Scholarship {
  id: number;
  school_id: number;
  programs: string | null;
  teaching_language: string | null;
  starting_date: string | null;
  scholarship_coverage_rmb: string | null;
  you_need_to_pay_rmb: string | null;
  learn_more_link: string | null;
  created_at: string;
}
// 后端完整的 API 响应类型
interface ApiResponse {
  school: School;
  programs: Program[];
  tuition_fees: TuitionFee[];
  accommodation_fees: AccommodationFee[];
  other_fees: OtherFee[];
  scholarships: Scholarship[];
}

// 前端使用的 University 类型（映射后）
interface University {
  id: number;
  name: string;
  location: string;
  country: string;
  tuition_fees: TuitionFee[];
  accommodation_fees: AccommodationFee[];
  other_fees: OtherFee[];
  state: string;
  type: string;
  established: number;
  ranking: {
    qs: number;
    times: number;
    arwu: number;
  };
  logo: string;
  heroImage: string;
  heroVideo: string;
  gallery: string[];
  description: string;
  mission: string;
  history: string;
  totalStudents: number;
  internationalStudents: number;
  acceptanceRate: number;
  graduationRate: number;
  employmentRate: number;

  livingCosts: {
    accommodation: number;
    food: number;
    transport: number;
    personal: number;
    currency: string;
  };
  popularSubjects: string[];
  rating: number;
  reviews: number;
  campuses: {
    name: string;
    location: string;
    description: string;
    facilities: string[];
    area: string;
    students: number;
  }[];
  facilities: {
    category: string;
    items: string[];
  }[];
  studentLife: {
    clubs: number;
    sports: number;
    culturalEvents: string;
    diversity: string;
    support: string;
  };
  scholarships: {
    name: string;
    amount: string;
    eligibility: string;
    coverage: string;
    deadline: string;
    renewable: boolean;
    teaching: string;
  }[];
  admissionRequirements: {
    undergraduate: {
      academicRequirements: string;
      englishRequirements: string;
      additionalRequirements: string;
      applicationProcess: string[];
    };
    postgraduate: {
      academicRequirements: string;
      englishRequirements: string;
      additionalRequirements: string;
      applicationProcess: string[];
    };
  };
  applicationDeadlines: {
    semester1: string;
    semester2: string;
    note: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    website: string;
    address: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
    };
  };
  quickFacts: {
    nobelPrizeWinners: number;
    researchCenters: number;
    libraryBooks: string;
    studentToStaffRatio: string;
    alumniNetwork: string;
    researchIncome: string;
  };
  courses: {
    id: number;
    name: string;
    level: string;
    duration: string;
    fees: string;
    subject: string;
    description: string;
  }[];
  studentReviews: {
    id: number;
    name: string;
    country: string;
    program: string;
    rating: number;
    date: string;
    review: string;
    helpful: number;
    aspects: {
      academics: number;
      campus: number;
      social: number;
      support: number;
    };
  }[];
  upcomingEvents: {
    name: string;
    date: string;
    time: string;
    type: string;
    description: string;
  }[];
  news: {
    title: string;
    date: string;
    summary: string;
  }[];
}

// 常见专业列表
export default function UniversityProfilePage() {
  const params = useParams()
  const universityId = Number.parseInt(params.id as string)
  const [university, setUniversity] = useState<University | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isSaved, setIsSaved] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [courseFilter, setCourseFilter] = useState("")
  const [courseLevelFilter, setCourseLevelFilter] = useState("all")
  const [expandedFacilities, setExpandedFacilities] = useState<string[]>([])
  const [reviewFilter, setReviewFilter] = useState("all")

  // 从环境变量获取后端 API 地址  http1://localhost:3000  http1://studyapi.vgit.cn
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://studyapi.vgit.cn'

useEffect(() => {
  const fetchUniversity = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/api/schools/${universityId}`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data: ApiResponse = await res.json()

      const gallery = data.school.campus_photos
        ? JSON.parse(data.school.campus_photos)   // 转成 string[]
        : [];

      const mappedUniversity: University = {
        /* ===== 基础信息 ===== */
        id: data.school.id,
        name: data.school.school_name,
        location: data.school.location || 'Unknown',
        country: data.school.location?.split(', ').pop() || 'Unknown',
        state: data.school.location?.split(', ')[0] || 'Unknown',
        type: data.school.attribute || 'Public',
        established: 0,
        ranking: { qs: 0, times: 0, arwu: 0 },
        logo: data.school.logo_url || '/placeholder.svg',
        heroImage: gallery[0] || '/placeholder.svg',
        heroVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        gallery,
        description: data.school.introduction || data.school.brief_intro || 'No description available',
        mission: 'No mission statement available',
        history: 'No history available',
        totalStudents: 0,
        internationalStudents: 0,
        acceptanceRate: 0,
        graduationRate: 0,
        employmentRate: 0,

        /* ===== 费用：原样透传 ===== */
        tuition_fees: data.tuition_fees || [],
        accommodation_fees: data.accommodation_fees || [],
        other_fees: data.other_fees || [],


        livingCosts: { accommodation: 0, food: 0, transport: 0, personal: 0, currency: 'CNY' },
        popularSubjects: [...new Set(data.programs.map(p => p.course_type || 'Unknown'))],
        rating: 0,
        reviews: 0,
        campuses: [],
        facilities: [],
        studentLife: { clubs: 0, sports: 0, culturalEvents: '', diversity: '', support: '' },
        scholarships: data.scholarships.map(s => ({
          name: s.programs || 'Unnamed Scholarship',
          amount: s.scholarship_coverage_rmb || '0',
          eligibility: 'No eligibility info available',
          coverage: s.scholarship_coverage_rmb || 'Unknown',
          deadline: s.starting_date || 'Unknown',
          renewable: false,
          teaching: s.teaching_language || 'Unknown',
        })),
        admissionRequirements: {
          undergraduate: {
            academicRequirements: data.programs
              .filter(p => p.course_type?.toLowerCase() === 'bachelor')
              .map(p => p.entry_requirements || 'No requirements available')
              .join('; ') || 'No requirements available',
            englishRequirements: 'No English requirements available',
            additionalRequirements: 'No additional requirements',
            applicationProcess: ['Apply online', 'Submit documents'],
          },
          postgraduate: {
            academicRequirements: data.programs
              .filter(p => p.course_type?.toLowerCase() === 'master')
              .map(p => p.entry_requirements || 'No requirements available')
              .join('; ') || 'No requirements available',
            englishRequirements: 'No English requirements available',
            additionalRequirements: 'No additional requirements',
            applicationProcess: ['Apply online', 'Submit documents'],
          },
        },
        applicationDeadlines: {
          semester1: data.programs[0]?.deadline || 'Unknown',
          semester2: data.programs[0]?.deadline || 'Unknown',
          note: 'Deadlines vary by program',
        },
        contactInfo: {
          phone: data.programs[0]?.tel || 'No phone available',
          email: data.programs[0]?.email || 'No email available',
          website: data.school.base_url,
          address: data.school.location || 'No address available',
          socialMedia: { facebook: '', twitter: '', instagram: '', linkedin: '' },
        },
        quickFacts: {
          nobelPrizeWinners: 0,
          researchCenters: 0,
          libraryBooks: '0',
          studentToStaffRatio: 'Unknown',
          alumniNetwork: 'Unknown',
          researchIncome: '0',
        },
        courses: data.programs.map(p => ({
          id: p.id,
          name: p.course_name,
          level: p.course_type || 'Unknown',
          duration: p.duration || 'Unknown',
          fees: p.tuition || '0',
          subject: p.course_type || 'Unknown',
          description: p.entry_requirements || 'No description available',
        })),
        studentReviews: [],
        upcomingEvents: [],
        news: [],
      }

      setUniversity(mappedUniversity)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }
  console.log(university?.tuition_fees);

  fetchUniversity()
}, [universityId, API_URL])


  // 渲染逻辑
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  // 错误或未找到大学
  if (error || !university) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">University Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The university you're looking for doesn't exist. (ID: {universityId})
          </p>
          <Button asChild>
            <a href="/universities">Browse Universities</a>
          </Button>
        </div>
      </div>
    )
  }

  // 面包屑导航
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Universities", href: "/universities" },
    { name: university.country, href: `/universities?country=${university.country}` },
    { name: university.name, href: "#" },
  ]

  // 用于动态过滤课程列表
  const filteredCourses = university.courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(courseFilter.toLowerCase()) ||
      course.subject.toLowerCase().includes(courseFilter.toLowerCase())
    const matchesLevel = courseLevelFilter === "all" || course.level === courseLevelFilter
    return matchesSearch && matchesLevel
  })

  // 用于动态过滤学生评价
  const filteredReviews = university.studentReviews.filter((review) => {
    if (reviewFilter === "all") return true
    if (reviewFilter === "5") return review.rating === 5
    if (reviewFilter === "4") return review.rating === 4
    if (reviewFilter === "recent") return new Date(review.date) > new Date("2024-01-01")
    return true
  })
 
  // 切换设施类别展开/收起
  const toggleFacilityExpansion = (category: string) => {
    setExpandedFacilities((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // 渲染主页面
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />}
                <a
                  href={item.href}
                  className={
                    index === breadcrumbs.length - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </div>
      {/*  头图和基本信息 */}
      <div className="relative h-96 overflow-hidden">
        {showVideo ? (
          <div className="w-full h-full">
            <iframe
              src={university.heroVideo}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            <img
              src={university.heroImage || "/placeholder.svg"}
              alt={`${university.name} campus`}
              className="w-full h-full object-cover"
            />
            <Button
              onClick={() => setShowVideo(true)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-4"
              size="lg"
            >
              <Play className="h-8 w-8" />
            </Button>
          </>
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end space-x-6">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={university.logo || "/placeholder.svg"}
                  alt={`${university.name} logo`}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="text-white">
                <h1 className="text-4xl font-bold font-serif mb-2">{university.name}</h1>
                <div className="flex items-center space-x-4 text-lg">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {university.location}
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    #{university.ranking.qs} QS World Ranking
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Est. {university.established}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // 操作按钮 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              {university.rating} ({university.reviews} reviews)
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="text-sm text-muted-foreground">Est. {university.established}</div>
            <Separator orientation="vertical" className="h-6" />
            <Badge variant="outline">{university.type} University</Badge>
            <Separator orientation="vertical" className="h-6" />
            <div className="text-sm text-muted-foreground">{university.totalStudents.toLocaleString()} students</div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSaved(!isSaved)}
              className={isSaved ? "bg-pink-50 border-pink-200 text-pink-700" : ""}
            >
              <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Saved" : "Shortlist"}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Brochure
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with Students
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button>Apply Now</Button>
          </div>
        </div>

      {/* 大学信息和侧边栏 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="fees">Fees & Aid</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

        {/* // 主要内容区域 */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About {university.name}</CardTitle>
                  </CardHeader>

                  {/* // 介绍 */}
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">{university.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Mission</h4>
                      <p className="text-muted-foreground leading-relaxed">{university.mission}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">History</h4>
                      <p className="text-muted-foreground leading-relaxed">{university.history}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{university.quickFacts.nobelPrizeWinners}</div>
                        <div className="text-sm text-muted-foreground">Nobel Prize Winners</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{university.quickFacts.researchCenters}+</div>
                        <div className="text-sm text-muted-foreground">Research Centers</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{university.quickFacts.libraryBooks}</div>
                        <div className="text-sm text-muted-foreground">Library Books</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {university.quickFacts.studentToStaffRatio}
                        </div>
                        <div className="text-sm text-muted-foreground">Student:Staff Ratio</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{university.quickFacts.alumniNetwork}</div>
                        <div className="text-sm text-muted-foreground">Alumni Network</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{university.quickFacts.researchIncome}</div>
                        <div className="text-sm text-muted-foreground">Research Income</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* // 排名 */}
                <Card>
                  <CardHeader>
                    <CardTitle>World Rankings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">#{university.ranking.qs}</div>
                        <div className="text-sm text-muted-foreground">QS World University Rankings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">#{university.ranking.times}</div>
                        <div className="text-sm text-muted-foreground">Times Higher Education</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">#{university.ranking.arwu}</div>
                        <div className="text-sm text-muted-foreground">Academic Ranking of World Universities</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* // 校园图片 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Camera className="h-5 w-5 mr-2" />
                      Campus Gallery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {university.gallery.map((image, index) => (
                        <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Campus view ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Virtual Campus Tour
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                {/* // 学生生活 */}
                <Card>
                  <CardHeader>
                    <CardTitle>Student Life & Diversity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Campus Life</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Student Clubs & Societies</span>
                            <span className="font-semibold">{university.studentLife.clubs}+</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sports & Recreation</span>
                            <span className="font-semibold">{university.studentLife.sports} sports</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Diversity & Support</h4>
                        <p className="text-sm text-muted-foreground mb-2">{university.studentLife.diversity}</p>
                        <p className="text-sm text-muted-foreground">{university.studentLife.support}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Cultural Events</h4>
                      <p className="text-sm text-muted-foreground">{university.studentLife.culturalEvents}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* // 侧边栏 */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Total Students</span>
                      </div>
                      <span className="font-semibold">{university.totalStudents.toLocaleString()}</span>
                    </div>
                    {/* // 国际学生比例 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">International Students</span>
                      </div>
                      <span className="font-semibold">{university.internationalStudents}%</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">International Diversity</span>
                        <span className="text-sm font-semibold">{university.internationalStudents}%</span>
                      </div>
                      <Progress value={university.internationalStudents} className="h-2" />
                    </div>
                    {/* // 录取率 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Acceptance Rate</span>
                      </div>
                      <span className="font-semibold">{university.acceptanceRate}%</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Acceptance Rate</span>
                        <span className="text-sm font-semibold">{university.acceptanceRate}%</span>
                      </div>
                      <Progress value={university.acceptanceRate} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Graduation Rate</span>
                        <span className="text-sm font-semibold">{university.graduationRate}%</span>
                      </div>
                      <Progress value={university.graduationRate} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Employment Rate</span>
                        <span className="text-sm font-semibold">{university.employmentRate}%</span>
                      </div>
                      <Progress value={university.employmentRate} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                  {/* // 热门专业 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Popular Subjects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {university.popularSubjects.map((subject, index) => (
                        <Badge key={index} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          {/* // 课程和项目 */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Courses & Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search courses..."
                      value={courseFilter}
                      onChange={(e) => setCourseFilter(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={courseLevelFilter} onValueChange={setCourseLevelFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Bachelor">Bachelor</SelectItem>
                      <SelectItem value="Master">Master</SelectItem>
                      <SelectItem value="Doctorate">Doctorate</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* // 课程列表 */}
                <div className="grid gap-4">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{course.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <Badge variant="outline">{course.level}</Badge>
                            <span>{course.duration}</span>
                            <span>{course.subject}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{course.fees}</div>
                          <div className="text-sm text-muted-foreground">per year</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredCourses.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          {/* // 设施和校园 */}
          <TabsContent value="facilities" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Campus Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {university.campuses.map((campus, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{campus.name}</h4>
                        <Badge variant="outline">{campus.area}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{campus.location}</p>
                      <p className="text-sm mb-3">{campus.description}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{campus.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {campus.facilities.map((facility, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              {/* // 设施列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>Campus Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {university.facilities.map((facilityGroup, index) => (
                      <div key={index} className="border rounded-lg">
                        <button
                          onClick={() => toggleFacilityExpansion(facilityGroup.category)}
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
                        >
                          <h4 className="font-semibold">{facilityGroup.category}</h4>
                          {expandedFacilities.includes(facilityGroup.category) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        {expandedFacilities.includes(facilityGroup.category) && (
                          <div className="px-4 pb-4 space-y-2">
                            {facilityGroup.items.map((facility, idx) => (
                              <div key={idx} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm">{facility}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* // 招生和申请 */} 
          <TabsContent value="admissions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Undergraduate Admissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Academic Requirements</h4>
                    <p className="text-muted-foreground text-sm">
                      {university.admissionRequirements.undergraduate.academicRequirements}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">English Language Requirements</h4>
                    <p className="text-muted-foreground text-sm">
                      {university.admissionRequirements.undergraduate.englishRequirements}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Additional Requirements</h4>
                    <p className="text-muted-foreground text-sm">
                      {university.admissionRequirements.undergraduate.additionalRequirements}
                    </p>
                  </div>
                </CardContent>
              </Card>
              {/* // 研究生招生 */}
              <Card>
                <CardHeader>
                  <CardTitle>Postgraduate Admissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Academic Requirements</h4>
                    <p className="text-muted-foreground text-sm">
                      {university.admissionRequirements.postgraduate.academicRequirements}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">English Language Requirements</h4>
                    <p className="text-muted-foreground text-sm">
                      {university.admissionRequirements.postgraduate.englishRequirements}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Additional Requirements</h4>
                    <p className="text-muted-foreground text-sm">
                      {university.admissionRequirements.postgraduate.additionalRequirements}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* // 申请截止日期 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Application Deadlines
                </CardTitle>
              </CardHeader>
              {/* // 申请截止日期内容 */}
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-lg font-semibold">Semester 1</div>
                    <div className="text-2xl font-bold text-primary my-2">
                      {university.applicationDeadlines.semester1}
                    </div>
                    <div className="text-sm text-muted-foreground">Main intake</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-lg font-semibold">Semester 2</div>
                    <div className="text-2xl font-bold text-primary my-2">
                      {university.applicationDeadlines.semester2}
                    </div>
                    <div className="text-sm text-muted-foreground">Mid-year intake</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">{university.applicationDeadlines.note}</p>
              </CardContent>
            </Card>
          </TabsContent>
          {/* 费用和资助 */}
          <TabsContent value="fees" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
    {/* ======  Tuition Fees 卡片  ====== */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Tuition Fees
              </CardTitle>
            </CardHeader>

        <CardContent className="space-y-4">
          {/* 1. 无数据提示 */}
          {university.tuition_fees.length === 0 && (
            <p className="text-sm text-muted-foreground">No tuition data available.</p>
          )}

          {/* 2. 按 level 分组展示 */}
          {Object.entries(
            university.tuition_fees.reduce<Record<string, string[]>>((acc, cur) => {
              const level = cur.level || "Other";
              acc[level] ??= [];
              acc[level].push(cur.fee || "0");
              return acc;
            }, {})
          ).map(([level, fees]) => (
            <div key={level} className="p-4 border rounded-lg">
              {/* level 标题 */}
              <div className="font-semibold mb-2">{level}</div>

              {/* 同 level 下的所有 fee 记录 */}
              <div className="space-y-1">
                {fees.map((f, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fee {idx + 1}</span>
                    <span className="font-semibold text-primary">¥{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 3. 底部提示 */}
          <p className="text-xs text-muted-foreground text-center">
            * Fees may vary by program; amounts in CNY.
          </p>
        </CardContent>
      </Card>

              {/* //  生活费用 */}
        <Card>
          <CardHeader>
            <CardTitle>Living & Other Costs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 1. 住宿费 - 原样字符串 */}
            <section>
              <h4 className="text-sm font-semibold mb-2">Accommodation</h4>
              <div className="space-y-2">
                {university.accommodation_fees?.length ? (
                  university.accommodation_fees.map((af) => (
                    <div key={af.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{af.room_type || 'Other'}</span>
                      <span className="font-semibold text-primary">{af.fee || 'N/A'}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No accommodation fee data.</p>
                )}
              </div>
            </section>

            {/* 2. 其它费用 - 原样字符串 */}
            <section>
              <h4 className="text-sm font-semibold mb-2">Other Fees</h4>
              <div className="space-y-2">
                {university.other_fees?.length ? (
                  university.other_fees.map((of) => (
                    <div key={of.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{of.item || 'Other'}</span>
                      <span className="font-semibold text-primary">{of.fee || 'N/A'}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No other fee data.</p>
                )}
              </div>
            </section>
          </CardContent>
        </Card>
            </div>
            {/* // 奖学金 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Available Scholarships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {university.scholarships.map((scholarship, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{scholarship.name}</h4>
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                          {scholarship.amount}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h5 className="font-semibold mb-1">Eligibility</h5>
                          <p className="text-muted-foreground">{scholarship.eligibility}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Coverage</h5>
                          <p className="text-muted-foreground">{scholarship.coverage}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Deadline</h5>
                          <p className="text-muted-foreground">{scholarship.deadline}</p>
                          {scholarship.renewable && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              Renewable
                            </Badge>
                          )}
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Teaching Language</h5>
                          <p className="text-muted-foreground">{scholarship.teaching}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button size="sm">Apply for Scholarship</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* // 评价和评论 */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Student Reviews
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select value={reviewFilter} onValueChange={setReviewFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reviews</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="recent">Recent</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Write a Review</Button>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold">{university.rating}</span>
                    <span className="text-muted-foreground ml-2">({university.reviews} reviews)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold">{review.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {review.country}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{review.program}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-muted-foreground">{review.date}</div>
                        </div>
                      </div>

                      <p className="text-sm mb-4">{review.review}</p>

                      <div className="grid grid-cols-4 gap-4 mb-4 text-xs">
                        <div className="text-center">
                          <div className="font-semibold">Academics</div>
                          <div className="flex items-center justify-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.aspects.academics ? "text-yellow-500 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Campus</div>
                          <div className="flex items-center justify-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.aspects.campus ? "text-yellow-500 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Social Life</div>
                          <div className="flex items-center justify-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.aspects.social ? "text-yellow-500 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">Support</div>
                          <div className="flex items-center justify-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.aspects.support ? "text-yellow-500 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* // 联系信息 */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{university.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{university.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a href={university.contactInfo.website} className="text-primary hover:underline">
                      {university.contactInfo.website}
                    </a>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <span>{university.contactInfo.address}</span>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={university.contactInfo.socialMedia.facebook}>Facebook</a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={university.contactInfo.socialMedia.twitter}>Twitter</a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={university.contactInfo.socialMedia.instagram}>Instagram</a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={university.contactInfo.socialMedia.linkedin}>LinkedIn</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Send an Inquiry</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Have questions about admissions, programs, or campus life? Send us a message.
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Phone Number" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Inquiry Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admissions">Admissions</SelectItem>
                        <SelectItem value="programs">Academic Programs</SelectItem>
                        <SelectItem value="scholarships">Scholarships</SelectItem>
                        <SelectItem value="campus">Campus Life</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea placeholder="Your message..." rows={4} />
                    <Button className="w-full">Send Inquiry</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
              {/* // 办公时间和校园地图 */}
            <Card>
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-semibold">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Saturday</span>
                      <span className="font-semibold">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                    <Separator />
                    <p className="text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 inline mr-1" />
                      All times are in Australian Eastern Time (AET)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Campus Map</h4>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Interactive campus map</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          View Full Map
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 space-y-8">
          {/* // 最新新闻和更新 */}
          <Card>
            <CardHeader>
              <CardTitle>Latest News & Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {university.news.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="text-xs text-muted-foreground mb-2">{item.date}</div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.summary}</p>
                    <Button variant="ghost" size="sm" className="mt-2 p-0">
                      Read more <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}