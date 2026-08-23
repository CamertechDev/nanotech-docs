// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NanoTech Documentation',
  tagline: 'Documentation centralisée des projets NanoTech-inovation',
  favicon: 'img/favicon.ico',

  url: 'https://nanotechdocs.vercel.app',
  baseUrl: '/',

  organizationName: 'NanoTech-Inovation',
  projectName: 'NanoTech-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'erp',
        path: 'erp',
        routeBasePath: 'erp',
        sidebarPath: './sidebars/erp.js',
        editUrl: 'https://github.com/CamertechDev/nanotech-docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cabineris',
        path: 'cabineris',
        routeBasePath: 'cabineris',
        sidebarPath: './sidebars/cabineris.js',
        editUrl: 'https://github.com/CamertechDev/nanotech-docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'sysfact',
        path: 'sysfact',
        routeBasePath: 'sysfact',
        sidebarPath: './sidebars/sysfact.js',
        editUrl: 'https://github.com/CamertechDev/nanotech-docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'nanotechdev',
        path: 'nanotechdev',
        routeBasePath: 'nanotechdev',
        sidebarPath: './sidebars/nanotechdev.js',
        editUrl: 'https://github.com/CamertechDev/nanotech-docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'artdevis',
        path: 'artdevis',
        routeBasePath: 'artdevis',
        sidebarPath: './sidebars/artdevis.js',
        editUrl: 'https://github.com/CamertechDev/nanotech-docs/tree/main/',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Exfob Docs',
        logo: {
          alt: 'Exfob Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/erp/intro',
            label: 'GestionBois ERP',
            position: 'left',
          },
          {
            to: '/cabineris/intro',
            label: 'Cabineris',
            position: 'left',
          },
          {
            to: '/sysfact/intro',
            label: 'Sysfact-Web',
            position: 'left',
          },
          {
            to: '/nanotechdev/intro',
            label: 'NanoTechDev-Inovation',
            position: 'left',
          },
          {
            to: '/artdevis/intro',
            label: 'ArtDevis',
            position: 'left',
          },
          {
            href: 'https://github.com/CamertechDev/nanotech-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentations',
            items: [
              {
                label: 'GestionBois ERP',
                to: '/erp/intro',
              },
              {
                label: 'Cabineris',
                to: '/cabineris/intro',
              },
              {
                label: 'Sysfact-Web',
                to: '/sysfact/intro',
              },
              {
                label: 'NanoTechDev-Inovation',
                to: '/nanotechdev/intro',
              },
              {
                label: 'ArtDevis',
                to: '/artdevis/intro',
              },
            ],
          },
          {
            title: 'Ressources',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/CamertechDev/nanotech-docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} NanoTech. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
