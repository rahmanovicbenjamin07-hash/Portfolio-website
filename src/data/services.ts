// Home page "What I do" list (src/components/home/Services.tsx).
// `icon` picks one of the pixel icons drawn in Services.tsx; it is also the row's link anchor (#design, #webflow, #react).

export type ServiceIcon = "design" | "webflow" | "react";

export type Service = {
  number: string;
  title: string;
  description: string;
  icon: ServiceIcon;
};

const services: Service[] = [
  {
    number: "2.1",
    title: "Web Design",
    description:
      "Clean, modern interfaces designed in Figma, from first wireframes to a full design system, ready to build in Webflow or React.",
    icon: "design",
  },
  {
    number: "2.2",
    title: "Webflow Development",
    description:
      "Everything in Webflow: full site builds, CMS, interactions, SEO setup and a simple handoff so your team can edit the site themselves.",
    icon: "webflow",
  },
  {
    number: "2.3",
    title: "React Development",
    description: "Custom React sites, components and integrations for projects that need more than a no-code tool can do.",
    icon: "react",
  },
];

export default services;
