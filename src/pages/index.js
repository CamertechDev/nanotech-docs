import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const projects = [
  {
    title: 'GestionBois ERP',
    description: 'Documentation du système ERP GestionBois.',
    to: '/erp/intro',
  },
  {
    title: 'Cabineris',
    description: 'Documentation du projet Cabineris.',
    to: '/cabineris/intro',
  },
  {
    title: 'Sysfact-Web',
    description: 'Documentation du projet Sysfact-Web.',
    to: '/sysfact/intro',
  },
  {
    title: 'ArtDevis',
    description: 'Application métier devis vocal pour artisans plombiers.',
    to: '/artdevis/intro',
  },
];

function ProjectCard({title, description, to}) {
  return (
    <div className={clsx('col col--4', styles.projectCard)}>
      <Link to={to} className={styles.projectLink}>
        <div className="card">
          <div className="card__body">
            <Heading as="h3">{title}</Heading>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Documentation centralisée des projets NanoTech">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        <section className={styles.projectsSection}>
          <div className="container">
            <div className="row">
              {projects.map((props, idx) => (
                <ProjectCard key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
