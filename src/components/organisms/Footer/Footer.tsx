import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ModalTerms, ModalPrivacy } from '@/components';
import { POLICY } from '@/constants';
import CI from '@/assets/images/ci.png';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => {
  const { className } = props;
  const navigate = useNavigate();

  const [modalTermsVisible, setModalTermsVisible] = useState(false);
  const [modalPrivacyVisible, setModalPrivacyVisible] = useState(false);

  return (
    <>
      <footer className={cx('root', className)}>
        <div className={styles.inner}>
          <p className={styles.ci}>
            <img src={CI} alt="KB데이타시스템" />
          </p>
          <address className={styles.address}>
            Copyright &copy; KB Data Systems. All rights reserved.
          </address>
          <nav className={styles.links}>
            <Button className="text-gray-0/50" onClick={() => setModalTermsVisible(true)}>
              {POLICY.TERMS}
            </Button>
            <Button className="text-gray-3" onClick={() => navigate(`/privacy`)}>
              {POLICY.PRIVACY}
            </Button>
          </nav>
        </div>
      </footer>
      <ModalTerms open={modalTermsVisible} onClose={() => setModalTermsVisible(false)} />
      <ModalPrivacy open={modalPrivacyVisible} onClose={() => setModalPrivacyVisible(false)} />
    </>
  );
};
export { Footer };
