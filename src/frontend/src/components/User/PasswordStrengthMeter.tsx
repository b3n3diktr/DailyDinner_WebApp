import React from 'react';
import zxcvbn from 'zxcvbn';
import '../../style.css';

interface PasswordStrengthMeterProps {
    password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
    const testResult = zxcvbn(password);
    const num = testResult.score * 100 / 4;

    const createPassLabel = () => {
        switch (testResult.score) {
            case 0:
                return 'Very Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'Very Weak';
        }
    };

    const progressColor = () => {
        switch (testResult.score) {
            case 0:
                return '#828282';
            case 1:
                return '#f06272';
            case 2:
                return '#ffc55e';
            case 3:
                return '#9bdeac';
            case 4:
                return '#7EFF9CFF';
            default:
                return 'none';
        }
    };

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: progressColor(),
        height: '8px',
        borderRadius: '10px 10px 10px 10px',
    });

    return (
        <div className="password-strengthmeter">
            <div style={changePasswordColor()} />
            <p>{createPassLabel()}</p>
        </div>
    );
};

export default PasswordStrengthMeter;