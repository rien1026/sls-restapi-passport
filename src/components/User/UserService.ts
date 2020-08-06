import { AppError, Constants } from '../../utils';
import { SigninErr } from './UserErrCode';
import * as jwt from 'jsonwebtoken';

const loginWithSocial = async (loginType: string, id: string, done: (err: any, user: any, info?: any) => void) => {
	try {
		// get user by social id
		let user = { no: 1, loginType: loginType, name: 'user', delDt: null };

		if (user) {
			// deleted user.
			if (user.delDt) {
				return done(undefined, undefined, SigninErr.WITHDREW_USER);
			}

			return done(undefined, user);
		}

		// if there is no user, create new user.
		user = { no: 1, loginType: loginType, name: 'new user', delDt: null };

		done(undefined, user);
	} catch (err) {
		new AppError('SloginWithSocial', err.message, err.stack);
		return done(err, undefined, SigninErr.UNKNOWN_ERR);
	}
};

const getToken = (user: {}, expiresIn: number = 2592000, isAdmin: boolean = false) => {
	try {
		return jwt.sign(user, String(Constants.SESSION_SECRET), {
			expiresIn: expiresIn,
		});
	} catch (err) {
		new AppError('SgetToken', err.message, err.stack);
		return undefined;
	}
};

export const UserService = { loginWithSocial, getToken };
