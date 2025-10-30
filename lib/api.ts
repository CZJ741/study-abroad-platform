const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "https://studyapi.vgit.cn/api" : "https://studyapi.vgit.cn/api"

export interface School {
  id: number
  school_name: string
  attribute: string
  level: string
  type: string
  location: string
  brief_intro: string
  introduction: string
  sid: number
  base_url: string
  available_levels?: string
  min_tuition?: string
  max_tuition?: string
}

export interface Program {
  id: number
  school_id: number
  course_name: string
  course_type: string
  start_date: string
  duration: string
  deadline: string
  language: string
  tuition: string
  application_fee: string
  entry_requirements: string
  school_name?: string
  location?: string
}

export interface Scholarship {
  id: number
  school_id: number
  programs: string
  teaching_language: string
  starting_date: string
  scholarship_coverage_rmb: string
  you_need_to_pay_rmb: string
  learn_more_link: string
  school_name?: string
  location?: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
}

// 获取学校列表
export async function getSchools(
  params: {
    page?: number
    limit?: number
    search?: string
    location?: string
    type?: string
  } = {},
): Promise<
  ApiResponse<{
    schools: School[]
    total: number
    page: number
    totalPages: number
    isRealData: boolean
  }>
> {
  try {
    console.log("[v0] API_BASE_URL:", API_BASE_URL)
    console.log("[v0] Attempting to fetch schools from API:", `${API_BASE_URL}/schools`)
    console.log("[v0] Request params:", params)

    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString())
    })

    const fullUrl = `${API_BASE_URL}/schools?${queryParams}`
    console.log("[v0] Full request URL:", fullUrl)

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response ok:", response.ok)

    const data = await response.json()
    console.log("[v0] Response data:", data)

    // 处理新的json错误格式
    if (data.error || !response.ok) {
      const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`
      throw new Error(errorMessage)
    }

    console.log("[v0] Successfully fetched data from API - schools count:", data.schools?.length || 0)

    return {
      data: {
        ...data,
        isRealData: true,
      },
    }
  } catch (error) {
    console.log("[v0] API Error Details:", error)
    console.log("[v0] Error type:", typeof error)
    console.log("[v0] Error message:", error instanceof Error ? error.message : String(error))

    console.log("[v0] Falling back to mock data")
    return {
      data: {
        schools: getMockSchools(params),
        total: 20,
        page: params.page || 1,
        totalPages: 2,
        isRealData: false,
      },
    }
  }
}

// 获取学校详情
export async function getSchoolDetail(id: string): Promise<
  ApiResponse<{
    school: School
    programs: Program[]
    tuition_fees: any[]
    accommodation_fees: any[]
    other_fees: any[]
    scholarships: Scholarship[]
  }>
> {
  try {
    // 从API获取学校详情
    const response = await fetch(`${API_BASE_URL}/schools/${id}`, {
      signal: AbortSignal.timeout(5000),
    })
    const data = await response.json()

    if (data.error || !response.ok) {
      const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`
      return { error: errorMessage }
    }

    

    return { data }
  } catch (error) {
    return { error: "Failed to fetch school details" }
  }
}

// 获取项目列表
export async function getPrograms(
  params: {
    page?: number
    limit?: number
    course_type?: string
    language?: string
    search?: string
  } = {},
): Promise<ApiResponse<{ programs: Program[] }>> {
  try {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString())
    })

    const response = await fetch(`${API_BASE_URL}/programs?${queryParams}`, {
      signal: AbortSignal.timeout(5000),
    })
    const data = await response.json()

    if (data.error || !response.ok) {
      const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`
      return { error: errorMessage }
    }

    return { data }
  } catch (error) {
    return { error: "Failed to fetch programs list" }
  }
}

// 获取奖学金列表
export async function getScholarships(): Promise<ApiResponse<{ scholarships: Scholarship[] }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/scholarships`, {
      signal: AbortSignal.timeout(5000),
    })
    const data = await response.json()

    if (data.error || !response.ok) {
      const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`
      return { error: errorMessage }
    }

    return { data }
  } catch (error) {
    return { error: "Failed to fetch scholarships list" }
  }
}

// 获取热门目的地
export async function getDestinations(): Promise<
  ApiResponse<{ destinations: Array<{ location: string; school_count: number }> }>
> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`, {
      signal: AbortSignal.timeout(5000),
    })
    const data = await response.json()

    if (data.error || !response.ok) {
      const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`
      return { error: errorMessage }
    }

    return { data }
  } catch (error) {
    return { error: "Failed to fetch destinations list" }
  }
}

// 添加 mock 数据 fallback 函数
function getMockSchools(
  params: {
    search?: string
    location?: string
    type?: string
  } = {},
): School[] {
  let mockSchools = [
    {
      id: 1,
      school_name: "清华大学",
      attribute: "Public",
      level: "Comprehensive",
      type: "University",
      location: "Beijing",
      brief_intro: "中国顶尖的综合性大学之一",
      introduction: "清华大学是中国著名的高等学府，位于北京西北郊风景秀丽的清华园。",
      sid: 1001,
      base_url: "https://www.tsinghua.edu.cn",
      available_levels: "Undergraduate,Graduate,PhD",
      min_tuition: "25000",
      max_tuition: "35000",
    },

  ]

  // 根据参数过滤 mock 数据
  if (params.search) {
    const searchLower = params.search.toLowerCase()
    mockSchools = mockSchools.filter(
      (school) =>
        school.school_name.toLowerCase().includes(searchLower) ||
        school.location.toLowerCase().includes(searchLower) ||
        school.brief_intro.toLowerCase().includes(searchLower),
    )
  }
  // 根据 location 和 type 过滤
  if (params.location && params.location !== "All Regions") {
    mockSchools = mockSchools.filter((school) => school.location === params.location)
  }
  // 根据 type 过滤
  if (params.type && params.type !== "All Types") {
    mockSchools = mockSchools.filter((school) => school.attribute === params.type)
  }

  return mockSchools
}
