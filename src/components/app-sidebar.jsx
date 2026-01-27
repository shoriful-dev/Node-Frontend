"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  BotMessageSquare,
  Command,
  GalleryVerticalEnd,
  SquareTerminal
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
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
      isActive: false,
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
      isActive: false,
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
      isActive: false,
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
      isActive: false,
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
      isActive: false,
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
      isActive: false,
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
  Order: [
    {
      title: "Order",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "All Order",
          url: "allorder",
        },
      ],
    },
    {
      title: "Qurier Pending Order",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "All Qurier Pending Order",
          url: "courier-pending",
        },
      ],
    },
    {
      title: "Qurier Return",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Stock Adjustment",
          url: "categorylist",
        },
      ],
    },
  ],

  sms: [
    {
      title: "SMS ",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Employee",
          url: "createcategory",
        },
        {
          title: "customer",
          url: "categorylist",
        },
      ],
    },
  ],

  role: [
    {
      title: "Role ",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create  Role",
          url: "createcategory",
        },
        {
          title: "Role List",
          url: "categorylist",
        },
      ],
    },
  ],
  permissons: [
    {
      title: "Permissons ",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create permisson",
          url: "createcategory",
        },
        {
          title: "permisson List",
          url: "categorylist",
        },
      ],
    },
  ],

  userPermissions: [
    {
      title: "User Permisson ",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create user permisson",
          url: "createcategory",
        },
        {
          title: "User permisson List",
          url: "categorylist",
        },
      ],
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
        <NavMain moduleName="Core Module" items={data.navMain} />
        <NavMain moduleName="Order Management" items={data.Order} />
        <NavMain moduleName="SMS Management" items={data.sms} />
        <NavMain moduleName="Role" items={data.role} />
        <NavMain moduleName="Permissons" items={data.permissons} />
        <NavMain moduleName="User Permissons" items={data.userPermissions} />

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default React.memo(AppSidebar) || AppSidebar;
