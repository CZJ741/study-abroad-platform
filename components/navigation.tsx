"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, User, Settings, LogOut, LayoutDashboard } from "lucide-react"

// Navigation组件，提供网站的导航栏和用户菜单
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-cyan-600">
            Study in China
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Courses
            </Link>
            <Link href="/universities" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Universities
            </Link>
            <Link href="/scholarships" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Scholarships
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Services
            </Link>
            <Link href="/compare" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Compare ({user?.comparedCourses?.length || 0})
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Community
            </Link>
            <Link href="/messages" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Messages
            </Link>
            <Link href="/guidance" className="text-gray-700 hover:text-cyan-600 transition-colors">
              Guidance
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.firstName} />
                      <AvatarFallback>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                href="/courses"
                className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/universities"
                className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Universities
              </Link>
              <Link
                href="/scholarships"
                className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Scholarships
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/compare"
                className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Compare ({user?.comparedCourses?.length || 0})
              </Link>
              <Link
                href="/community"
                className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>
              <Link
                href="/messages"
                className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Messages
              </Link>
              <Link
                href="/guidance"
                className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Guidance
              </Link>

              {user ? (
                <>
                  <div className="border-t border-gray-200 pt-4 pb-3">
                    <div className="flex items-center px-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.firstName} />
                        <AvatarFallback>
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <Link
                        href="/dashboard"
                        className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-4 pb-3 space-y-1">
                  <Link
                    href="/auth/signin"
                    className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-3 py-2 text-gray-700 hover:text-cyan-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
