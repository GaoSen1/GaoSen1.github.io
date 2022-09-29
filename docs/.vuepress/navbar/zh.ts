import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "电子电路",
    icon: "discover",
    prefix: "/电子电路/",
    children: [
      {
        text: "常用电路",
        icon: "edit",
        link: "常用电路/"
      },
      {
        text: "常用芯片",
        icon: "edit",
        link: "常用芯片/"
      },
      {
        text: "放大器",
        icon: "edit",
        link: "放大器/"
      },
    ]
  },
  {
    text: "课程实验",
    icon: "discover",
    prefix: "/课程实验/",
    children: [
      {
        text: "专业实验",
        icon: "discover",
        link: "专业实验/"
      },
      {
        text: "单片机实验",
        icon: "discover",
        link: "单片机实验/"
      },
      {
        text: "数电实验",
        icon: "discover",
        link: "数电实验/"
      },
      {
        text: "概率论",
        icon: "discover",
        link: "概率论/"
      },
      {
        text: "模电实验",
        icon: "discover",
        link: "模电实验/"
      },
      {
        text: "电子院小学期",
        icon: "discover",
        link: "电子院小学期/"
      },
    ]
  },
  {
    text: "Web前端相关",
    icon: "discover",
    prefix: "/Web前端相关/",
    children: [
      {
        text: "工具库",
        icon: "discover",
        link: "工具库/",
      },
      {
        text: "建站手册",
        icon: "discover",
        link: "建站手册/",
      },
    ]
  },
]);
