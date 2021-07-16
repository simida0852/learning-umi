/* eslint-disable no-empty-pattern */

import type { MenuDataItem } from '@ant-design/pro-layout';
import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { ConnectProps } from 'umi';
import { Link, SelectLang, useIntl, connect } from 'umi';
import React from 'react';
import type { ConnectState } from '@/models/connect';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { defaultFooterDom } from './BasicLayout';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: Record<string, MenuDataItem>;
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const {} = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>桑里</span>
              </Link>
            </div>
            <div className={styles.desc}>桑里管理系统</div>
          </div>
          {children}
        </div>
        {defaultFooterDom}
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
