import { Modal } from '../../ui';
import ForgotPasswordForm from './ForgotPasswordForm';
import forgotPassWordBanner from '../../../images/forgot-password-banner.jpg'

const ForgotPassword: React.FC = () => {
    const handleForgotPassSubmit = () => {

    }
    return (
        <>
            <Modal title="Reset Your Password" src = {forgotPassWordBanner}>
                <ForgotPasswordForm onSubmit={handleForgotPassSubmit} />
            </Modal>
        </>
    );
}

export default ForgotPassword;