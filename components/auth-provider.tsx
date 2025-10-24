"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  country: string
  avatar?: string
  savedCourses: string[]
  comparedCourses: string[]
  preferences: {
    subjects: string[]
    countries: string[]
    studyLevel: string[]
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: any) => Promise<void>
  signOut: () => void
  updateUser: (userData: Partial<User>) => void
  saveCourse: (courseId: string) => void
  removeSavedCourse: (courseId: string) => void
  addToComparison: (courseId: string) => void
  removeFromComparison: (courseId: string) => void
  clearComparison: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider组件，管理用户认证状态和相关操作
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

 // 初始化时检查用户的认证状态
  useEffect(() => {
    const checkAuth = async () => {
      // Simulate API call to check authentication status
      const savedUser = localStorage.getItem("studyabroad_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // 模拟用户登录
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const testAccounts = {
      "student@test.com": {
        id: "1",
        email: "student@test.com",
        firstName: "Alex",
        lastName: "Chen",
        country: "China",
        savedCourses: ["1", "3", "5"],
        comparedCourses: ["2", "4"],
        preferences: {
          subjects: ["Computer Science", "Business"],
          countries: ["United States", "United Kingdom"],
          studyLevel: ["Master's"],
        },
      },
      "john@demo.com": {
        id: "2",
        email: "john@demo.com",
        firstName: "John",
        lastName: "Smith",
        country: "India",
        savedCourses: ["2", "4", "6", "8"],
        comparedCourses: ["1", "3", "7"],
        preferences: {
          subjects: ["Engineering", "Medicine"],
          countries: ["Australia", "Canada"],
          studyLevel: ["Bachelor's", "Master's"],
        },
      },
      "maria@example.com": {
        id: "3",
        email: "maria@example.com",
        firstName: "Maria",
        lastName: "Rodriguez",
        country: "Mexico",
        savedCourses: ["7", "9"],
        comparedCourses: [],
        preferences: {
          subjects: ["Arts", "Languages"],
          countries: ["Spain", "France"],
          studyLevel: ["Bachelor's"],
        },
      },
    }

    // 检查是否为测试账号
    const testUser = testAccounts[email as keyof typeof testAccounts]
    if (testUser) {
      setUser(testUser)
      localStorage.setItem("studyabroad_user", JSON.stringify(testUser))
      setIsLoading(false)
      return
    }

    // 对于非测试账号，创建一个模拟用户
    const mockUser: User = {
      id: "default",
      email,
      firstName: "Demo",
      lastName: "User",
      country: "United States",
      savedCourses: [],
      comparedCourses: [],
      preferences: {
        subjects: [],
        countries: [],
        studyLevel: [],
      },
    }

    setUser(mockUser)
    localStorage.setItem("studyabroad_user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  // 模拟用户注册
  const signUp = async (userData: any) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      country: userData.country,
      savedCourses: [],
      comparedCourses: [],
      preferences: {
        subjects: [],
        countries: [userData.country],
        studyLevel: [],
      },
    }

    setUser(newUser)
    localStorage.setItem("studyabroad_user", JSON.stringify(newUser))
    setIsLoading(false)
  }

  // 用户登出
  const signOut = () => {
    setUser(null)
    localStorage.removeItem("studyabroad_user")
  }

  // 更新用户信息
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("studyabroad_user", JSON.stringify(updatedUser))
    }
  }

  // 保存课程到用户收藏
  const saveCourse = (courseId: string) => {
    if (user && !user.savedCourses.includes(courseId)) {
      const updatedUser = {
        ...user,
        savedCourses: [...user.savedCourses, courseId],
      }
      setUser(updatedUser)
      localStorage.setItem("studyabroad_user", JSON.stringify(updatedUser))
    }
  }

  // 从用户收藏中移除课程
  const removeSavedCourse = (courseId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        savedCourses: user.savedCourses.filter((id) => id !== courseId),
      }
      setUser(updatedUser)
      localStorage.setItem("studyabroad_user", JSON.stringify(updatedUser))
    }
  }

  // 添加课程到对比列表
  const addToComparison = (courseId: string) => {
    if (user && !user.comparedCourses.includes(courseId) && user.comparedCourses.length < 4) {
      const updatedUser = {
        ...user,
        comparedCourses: [...user.comparedCourses, courseId],
      }
      setUser(updatedUser)
      localStorage.setItem("studyabroad_user", JSON.stringify(updatedUser))
    }
  }

  //  从对比列表中移除课程
  const removeFromComparison = (courseId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        comparedCourses: user.comparedCourses.filter((id) => id !== courseId),
      }
      setUser(updatedUser)
      localStorage.setItem("studyabroad_user", JSON.stringify(updatedUser))
    }
  }

  // 清空对比列表
  const clearComparison = () => {
    if (user) {
      const updatedUser = {
        ...user,
        comparedCourses: [],
      }
      setUser(updatedUser)
      localStorage.setItem("studyabroad_user", JSON.stringify(updatedUser))
    }
  }

  // 提供给子组件的上下文值
  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
    saveCourse,
    removeSavedCourse,
    addToComparison,
    removeFromComparison,
    clearComparison,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 自定义hook，方便在组件中使用AuthContext
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
