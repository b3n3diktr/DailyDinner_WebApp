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
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9bdeac';
            case 4:
                return '#00b500';
            default:
                return 'none';
        }
    };

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: progressColor(),
        height: '7px'
    });

    return (
        <div className="password-strength-meter">
            <progress
                className="password-strength-meter-progress"
                value={testResult.score}
                max="4"
            />
            <div style={changePasswordColor()} />
            <p>{createPassLabel()}</p>
        </div>
    );
};

export default PasswordStrengthMeter;
