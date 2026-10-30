import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNavigationGroups, getRoleLabel, isNavigationActive } from '../../features/navigation/navigation';
import { Icons } from '../ui';
import styles from './NavigationDrawer.module.css';
interface Props { open: boolean; roles: string[]; authenticated: boolean; onClose: () => void }
export function NavigationDrawer({ open, roles, authenticated, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  return <dialog ref={dialog} id="module-navigation" className={styles.dialog} aria-labelledby="navigation-title" onCancel={onClose} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.content}>
      <header className={styles.header}><div><h2 id="navigation-title">Danh mục chức năng</h2><p>{authenticated ? getRoleLabel(roles) : 'Khám phá & đăng ký học'}</p></div>
        <button type="button" onClick={onClose} aria-label="Đóng danh mục" autoFocus><Icons.X size={22} /></button>
      </header>
      <nav aria-label="Các phân hệ theo quyền truy cập" className={styles.groups}>
        {getNavigationGroups(authenticated ? roles : []).map(group => <section key={group.id}>
          <h3>{group.label}</h3>
          {group.items.map(item => <Link key={item.path} to={item.path} onClick={onClose} aria-current={isNavigationActive(pathname, item) ? 'page' : undefined} className={`${styles.link} ${item.path === '/student/driving-simulation' ? styles.simulation : ''}`}>
            {item.path === '/student/driving-simulation' && <Icons.Car size={18} />}{item.label}
          </Link>)}
        </section>)}
        {!authenticated && <section><h3>Tài khoản</h3><Link to="/login" onClick={onClose} className={styles.link}>Đăng nhập</Link><Link to="/register" onClick={onClose} className={styles.link}>Đăng ký tài khoản</Link></section>}
      </nav>
    </div>
  </dialog>;
}
