"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  BotMessageSquare,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Node 2501",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme ",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Category",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Category",
          url: "createcategory",
        },
        {
          title: "Category List",
          url: "categorylist",
        },
      ],
    },

    {
      title: "Sub-Category",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Create sub Category",
          url: "subcategory",
        },
        {
          title: "Sub-Category",
          url: "subcategorylist",
        },
      ],
    },
    {
      title: "Brand",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Create Brand",
          url: "createbrand",
        },
        {
          title: "Brand List",
          url: "brandlist",
        },
      ],
    },
    {
      title: "Single V Product",
      url: "#",

      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Create Single Variant",
          url: "createsvp",
        },
        {
          title: "Single Variant List",
          url: "svplist",
        },
      ],
    },
    {
      title: "Multiple V Product",
      url: "#",

      icon: BotMessageSquare,
      isActive: true,
      items: [
        {
          title: "Create Multiple Variant",
          url: "createmvp",
        },
        {
          title: "Multiple Variant List",
          url: "mvplist",
        },
      ],
    },
     {
      title: "Variant",
      url: "#",

      icon: BotMessageSquare,
      isActive: true,
      items: [
        {
          title: "Create  Variant",
          url: "createVariant",
        },
        {
          title: " Variant List",
          url: "variantList",
        },
      ],
    },
    
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default React.memo(AppSidebar) || AppSidebar;
