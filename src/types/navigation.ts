export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  highlight?: boolean;
}

export interface MegaMenuItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  featuredProduct?: {
    name: string;
    image: string;
    price: number;
    link: string;
  };
  subSections: {
    title: string;
    links: { name: string; href: string; isNew?: boolean }[];
  }[];
}
