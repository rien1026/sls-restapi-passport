import passport from 'koa-passport';
import * as passportKakao from 'triz-passport-kakao';
import * as passportJwt from 'passport-jwt';
import * as passportFaceBook from 'passport-facebook';
import * as passportNaver from 'passport-naver';
import * as passportGoogle from 'passport-google-oauth20';
import { UserService } from '../components/User';
import { Constants } from '../utils';

const KakaoStrategy = passportKakao.Strategy;
const JwtStrategy = passportJwt.Strategy;
const FacebookStrategy = passportFaceBook.Strategy;
const NaverStrategy = passportNaver.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

passport.use(
	new KakaoStrategy(
		{
			clientID: Constants.SOCIAL_CONFIG.CLIENT_ID_KAKAO,
			clientSecret: '', // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
			callbackURL: Constants.SOCIAL_CONFIG.CALLBACK_URL_KAKAO,
		},
		(
			accessToken: string,
			refreshToken: string,
			profile: passportKakao.Profile,
			done: (err: any, user: any, info?: any) => void,
		) => {
			UserService.loginWithSocial('kakao', profile.id, done);
		},
	),
);

passport.use(
	new FacebookStrategy(
		{
			clientID: Constants.SOCIAL_CONFIG.CLIENT_ID_FACEBOOK,
			clientSecret: Constants.SOCIAL_CONFIG.CLIENT_SECRET_FACEBOOK,
			callbackURL: Constants.SOCIAL_CONFIG.CALLBACK_URL_FACEBOOK,
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: passportFaceBook.Profile,
			done: (err: any, user: any, info?: any) => void,
		) => {
			UserService.loginWithSocial('facebook', profile.id, done);
		},
	),
);

passport.use(
	new NaverStrategy(
		{
			clientID: Constants.SOCIAL_CONFIG.CLIENT_ID_NAVER,
			clientSecret: Constants.SOCIAL_CONFIG.CLIENT_SECRET_NAVER,
			callbackURL: Constants.SOCIAL_CONFIG.CALLBACK_URL_NAVER,
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: passportFaceBook.Profile,
			done: (err: any, user: any, info?: any) => void,
		) => {
			UserService.loginWithSocial('naver', profile.id, done);
		},
	),
);

passport.use(
	new GoogleStrategy(
		{
			clientID: Constants.SOCIAL_CONFIG.CLIENT_ID_GOOGLE,
			clientSecret: Constants.SOCIAL_CONFIG.CLIENT_SECRET_GOOGLE,
			callbackURL: Constants.SOCIAL_CONFIG.CALLBACK_URL_GOOGLE,
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: passportFaceBook.Profile,
			done: (err: any, user: any, info?: any) => void,
		) => {
			UserService.loginWithSocial('google', profile.id, done);
		},
	),
);

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'P@ssw0rd',
		},
		async (tokenPayload, done) => {
			done(undefined, tokenPayload);
		},
	),
);

export const configPassport = () => {};
