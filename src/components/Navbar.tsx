import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: JSX.Element;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

import { useAuth } from "../context/AuthContext";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react";

export default function Navbar({
  logo = {
    url: "/",
    src: "/Parity_logo.png",
    alt: "ParityBit Academy Logo",
    title: "",
  },
  menu = [
    {
      title: "Curriculum",
      url: "/#curriculum",
    },
    {
      title: "Pricing",
      url: "/#pricing",
    },
    {
      title: "FAQ",
      url: "/#faq",
    },
  ],
  mobileExtraLinks = [
    { name: "Terms of Service", url: "/terms" },
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Refund Policy", url: "/refund" },
  ],
}: Navbar1Props) {
  const { user, profile, signOut } = useAuth();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return user?.email?.[0].toUpperCase() || "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleEnrollClick = (e: React.MouseEvent) => {
    if (!user) {
      // If not logged in, take to login
      return;
    }
    // If logged in, the link destination is already set to /payment via the button's Link component
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-10">
            <Link to={logo.url} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={logo.src} className="h-12 md:h-16 object-contain" alt={logo.alt} />
              {logo.title && <span className="text-lg font-semibold">{logo.title}</span>}
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="size-10 rounded-full bg-[#7B2CBF]/10 border border-[#7B2CBF]/20 flex items-center justify-center text-[#7B2CBF] font-black text-sm tracking-widest hover:bg-[#7B2CBF] hover:text-white transition-all duration-300">
                      {getInitials(profile?.full_name)}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-56 p-0 overflow-hidden rounded-2xl">
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                      <p className="text-[10px] font-black tracking-[0.2em] text-[#7B2CBF] uppercase mb-1">Student Portal_</p>
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {profile?.full_name || user.email?.split('@')[0]}
                      </p>
                    </div>
                    <div className="p-2">
                       <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all text-left"
                       >
                         <LogOut className="w-4 h-4" />
                         Sign Out
                       </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <Button asChild variant="ghost" className="text-[#1A122E] hover:text-[#7B2CBF] font-bold tracking-wide transition-colors">
                <Link to="/login">Login</Link>
              </Button>
            )}
            
            <Button asChild className="bg-[#7B2CBF] hover:bg-[#9D4EDD] text-white font-bold rounded shadow-lg tracking-widest px-8 py-5 uppercase transition-all duration-300">
              <Link 
                to={!user ? "/login" : (profile?.payment_status === 'completed' ? "/dashboard" : "/payment")}
                onClick={handleEnrollClick}
              >
                {!user ? "Enroll Now" : (profile?.payment_status === 'completed' ? "Dashboard" : "Complete Enroll")}
              </Link>
            </Button>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to={logo.url} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={logo.src} className="h-10 sm:h-12 object-contain" alt={logo.alt} />
              {logo.title && <span className="text-lg font-semibold">{logo.title}</span>}
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#1A122E] hover:text-[#7B2CBF] transition-colors">
                  <Menu className="size-8" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-white border-l border-[#E7E7DE]">
                <SheetHeader className="mb-8">
                  <SheetTitle>
                    <Link to={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="h-10 object-contain" alt={logo.alt} />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="border-t border-[#E7E7DE] py-4">
                    <div className="grid grid-cols-2 justify-start gap-4">
                      {mobileExtraLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-bold text-slate-500 hover:text-[#7B2CBF] transition-colors"
                          to={link.url}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    {user ? (
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className="size-12 rounded-full bg-[#7B2CBF] flex items-center justify-center text-white font-black text-sm tracking-widest shadow-lg shadow-[#7B2CBF]/20">
                          {getInitials(profile?.full_name)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black tracking-[0.2em] text-[#7B2CBF] uppercase">Welcome Back_</span>
                          <span className="font-bold text-slate-900">{profile?.full_name || user.email?.split('@')[0]}</span>
                        </div>
                      </div>
                    ) : (
                      <Button asChild variant="outline" className="w-full border-slate-200 text-slate-800 font-bold hover:bg-slate-50">
                        <Link to="/login">Login</Link>
                      </Button>
                    )}
                    
                    <Button asChild className="w-full bg-[#7B2CBF] hover:bg-[#9D4EDD] text-white font-bold tracking-widest uppercase transition-all">
                      <Link to={!user ? "/login" : (profile?.payment_status === 'completed' ? "/dashboard" : "/payment")}>
                        {!user ? "Enroll Now" : (profile?.payment_status === 'completed' ? "Dashboard" : "Complete Enroll")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent text-[#1A122E] hover:text-[#7B2CBF] font-bold tracking-wide data-[state=open]:bg-transparent focus:bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3 bg-white border border-[#E7E7DE] shadow-xl rounded-xl">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <a
                    className="flex select-none gap-4 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 text-slate-900"
                    href={subItem.url}
                  >
                    {subItem.icon && <div className="text-[#7B2CBF]">{subItem.icon}</div>}
                    <div>
                      <div className="text-sm font-bold tracking-wide">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-xs leading-snug text-slate-500 mt-1">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <a
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-bold tracking-wide text-[#1A122E] transition-colors hover:text-[#7B2CBF]"
      href={item.url}
    >
      {item.title}
    </a>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b border-[#E7E7DE]/50">
        <AccordionTrigger className="py-2 text-slate-800 font-bold hover:no-underline hover:text-[#7B2CBF] tracking-wide">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 pb-4">
          <div className="flex flex-col gap-2">
            {item.items.map((subItem) => (
               <a
                key={subItem.title}
                className="flex items-start gap-4 rounded-md p-3 transition-colors hover:bg-slate-50 bg-[#FBFBF7]/50"
                href={subItem.url}
              >
                {subItem.icon && <div className="text-[#7B2CBF] mt-0.5">{subItem.icon}</div>}
                <div>
                  <div className="text-sm font-bold text-slate-900">{subItem.title}</div>
                  {subItem.description && (
                    <p className="text-xs leading-snug text-slate-500 mt-1">
                      {subItem.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="py-2 text-slate-800 font-bold tracking-wide hover:text-[#7B2CBF] transition-colors border-b border-transparent">
      {item.title}
    </a>
  );
};
