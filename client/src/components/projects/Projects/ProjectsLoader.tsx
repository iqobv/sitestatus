import ProjectItemLoader from './ProjectItem/ProjectItemLoader';
import styles from './Projects.module.scss';

const projects = Array.from({ length: 12 }, (_, i) => (
	<ProjectItemLoader key={i} />
));

const ProjectsLoader = () => {
	return <div className={styles.list}>{projects}</div>;
};

export default ProjectsLoader;
