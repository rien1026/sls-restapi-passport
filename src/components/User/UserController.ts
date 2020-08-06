import Koa from 'koa';
import { AppError } from '../../utils/AppError';
import passport from 'passport';
import { Constants } from '../../utils';
import { UserService } from '.';

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSchema:
 *       type: object
 *       properties:
 *         no:
 *           type: number
 *         id:
 *           type: string
 *           format: id
 *         nickname:
 *           type: string
 *
 * /app/users/:userNo:
 *   get:
 *     tags: [User]
 *     responses:
 *       200:
 *         description: SUC
 *         type: object
 *         properties:
 *           msg:
 *             type: string
 *             example: suc
 *           data:
 *             $ref: '#components/schemas/UserSchema'
 *
 */
const getUser = async (ctx: Koa.Context) => {
	try {
		let user = { no: 1, id: 'user@user.com', nickname: 'nickname' };
		ctx.status = 200;
		ctx.body = { msg: 'suc', data: user };
	} catch (err) {
		throw new AppError('CgetUser', err.message, err.stack, {
			errCode: err.errCode,
			responseCode: err.responseCode,
		});
	}
};

/**
 * @swagger
 * /app/login/kakao:
 *   get:
 *     tags: [User]
 *     summery: social login
 *
 */

/**
 * @swagger
 * /app/login/naver:
 *   get:
 *     tags: [User]
 *     summery: social login
 *
 */

/**
 * @swagger
 * /app/login/facebook:
 *   get:
 *     tags: [User]
 *     summery: social login
 *
 */

/**
 * @swagger
 * /app/login/google:
 *   get:
 *     tags: [User]
 *     summery: social login
 *
 */
const loginSocial = (socialName: 'kakao' | 'facebook' | 'naver' | 'google') => {
	let scope = ['profile'];

	if (socialName == 'facebook') {
		scope = ['public_profile', 'email'];
	}

	return (ctx: Koa.Context) => {
		return passport.authenticate(
			socialName,
			{ session: false, scope: scope },
			async (err: any, user: any, info?: any) => {
				try {
					if (err) {
						throw new AppError('CloginSocial', err.message, err.stack);
					}

					if (info || !user) {
						throw new AppError('CloginSocial', info, null);
					}

					let token = UserService.getToken(user);

					ctx.redirect(Constants.SOCIAL_CONFIG.SUC_LOGIN_URL + '/' + token + '/' + user.new);
				} catch (err) {
					new AppError('CloginSocial', err.message, err.stack);
					ctx.redirect(Constants.SOCIAL_CONFIG.FAIL_LOGIN_URL);
				}
			},
		)(ctx);
	};
};

export const UserController = { getUser, loginSocial };
