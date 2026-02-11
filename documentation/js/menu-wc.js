'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-a009ef05747f4f11a00b6a62d2d1cb5d1b3d46f9124629e6faa3b218cc5e6ceb84858fabf3ac9f2258c46d6276ec9a3e245e6ecd4844874dce02dc8502fd52d7"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-a009ef05747f4f11a00b6a62d2d1cb5d1b3d46f9124629e6faa3b218cc5e6ceb84858fabf3ac9f2258c46d6276ec9a3e245e6ecd4844874dce02dc8502fd52d7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-a009ef05747f4f11a00b6a62d2d1cb5d1b3d46f9124629e6faa3b218cc5e6ceb84858fabf3ac9f2258c46d6276ec9a3e245e6ecd4844874dce02dc8502fd52d7"' :
                                            'id="xs-controllers-links-module-AuthModule-a009ef05747f4f11a00b6a62d2d1cb5d1b3d46f9124629e6faa3b218cc5e6ceb84858fabf3ac9f2258c46d6276ec9a3e245e6ecd4844874dce02dc8502fd52d7"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-a009ef05747f4f11a00b6a62d2d1cb5d1b3d46f9124629e6faa3b218cc5e6ceb84858fabf3ac9f2258c46d6276ec9a3e245e6ecd4844874dce02dc8502fd52d7"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-a009ef05747f4f11a00b6a62d2d1cb5d1b3d46f9124629e6faa3b218cc5e6ceb84858fabf3ac9f2258c46d6276ec9a3e245e6ecd4844874dce02dc8502fd52d7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-a009ef05747f4f11a00b6a62d2d1cb5d1b3d46f9124629e6faa3b218cc5e6ceb84858fabf3ac9f2258c46d6276ec9a3e245e6ecd4844874dce02dc8502fd52d7"' :
                                        'id="xs-injectables-links-module-AuthModule-a009ef05747f4f11a00b6a62d2d1cb5d1b3d46f9124629e6faa3b218cc5e6ceb84858fabf3ac9f2258c46d6276ec9a3e245e6ecd4844874dce02dc8502fd52d7"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BcryptProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BcryptProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommonModule-ec5e67383924d1bb4a441ba702ec20d8ff69ed330a19757a0131dce27fb280042cb57cdad6ee6aeaed0c285b21f311583de8bf4fce6b0b751e995dcaa73d0cf8"' : 'data-bs-target="#xs-injectables-links-module-CommonModule-ec5e67383924d1bb4a441ba702ec20d8ff69ed330a19757a0131dce27fb280042cb57cdad6ee6aeaed0c285b21f311583de8bf4fce6b0b751e995dcaa73d0cf8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommonModule-ec5e67383924d1bb4a441ba702ec20d8ff69ed330a19757a0131dce27fb280042cb57cdad6ee6aeaed0c285b21f311583de8bf4fce6b0b751e995dcaa73d0cf8"' :
                                        'id="xs-injectables-links-module-CommonModule-ec5e67383924d1bb4a441ba702ec20d8ff69ed330a19757a0131dce27fb280042cb57cdad6ee6aeaed0c285b21f311583de8bf4fce6b0b751e995dcaa73d0cf8"' }>
                                        <li class="link">
                                            <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataResponseInterceptor</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EnvModule.html" data-type="entity-link" >EnvModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FeaturesModule.html" data-type="entity-link" >FeaturesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InfrastructureModule.html" data-type="entity-link" >InfrastructureModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SessionsModule.html" data-type="entity-link" >SessionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SessionsModule-de6fb0ca609097633496ae3dceecfd07b2ae517a47b31c2d2160c47652b1934a84f2db0636f80c2babcdea0adb6a7a35c316b55ce88625a3b6061bae7bbc5709"' : 'data-bs-target="#xs-controllers-links-module-SessionsModule-de6fb0ca609097633496ae3dceecfd07b2ae517a47b31c2d2160c47652b1934a84f2db0636f80c2babcdea0adb6a7a35c316b55ce88625a3b6061bae7bbc5709"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SessionsModule-de6fb0ca609097633496ae3dceecfd07b2ae517a47b31c2d2160c47652b1934a84f2db0636f80c2babcdea0adb6a7a35c316b55ce88625a3b6061bae7bbc5709"' :
                                            'id="xs-controllers-links-module-SessionsModule-de6fb0ca609097633496ae3dceecfd07b2ae517a47b31c2d2160c47652b1934a84f2db0636f80c2babcdea0adb6a7a35c316b55ce88625a3b6061bae7bbc5709"' }>
                                            <li class="link">
                                                <a href="controllers/SessionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SessionsModule-de6fb0ca609097633496ae3dceecfd07b2ae517a47b31c2d2160c47652b1934a84f2db0636f80c2babcdea0adb6a7a35c316b55ce88625a3b6061bae7bbc5709"' : 'data-bs-target="#xs-injectables-links-module-SessionsModule-de6fb0ca609097633496ae3dceecfd07b2ae517a47b31c2d2160c47652b1934a84f2db0636f80c2babcdea0adb6a7a35c316b55ce88625a3b6061bae7bbc5709"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SessionsModule-de6fb0ca609097633496ae3dceecfd07b2ae517a47b31c2d2160c47652b1934a84f2db0636f80c2babcdea0adb6a7a35c316b55ce88625a3b6061bae7bbc5709"' :
                                        'id="xs-injectables-links-module-SessionsModule-de6fb0ca609097633496ae3dceecfd07b2ae517a47b31c2d2160c47652b1934a84f2db0636f80c2babcdea0adb6a7a35c316b55ce88625a3b6061bae7bbc5709"' }>
                                        <li class="link">
                                            <a href="injectables/SessionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-ee5b87acc91b658ce7d5772f02dac01e0d77b97c58e14b0211975008fee3122cb75baed518da56b4e0ea45bd1923c2d99eb811829643bd679069df97f28a6d84"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-ee5b87acc91b658ce7d5772f02dac01e0d77b97c58e14b0211975008fee3122cb75baed518da56b4e0ea45bd1923c2d99eb811829643bd679069df97f28a6d84"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-ee5b87acc91b658ce7d5772f02dac01e0d77b97c58e14b0211975008fee3122cb75baed518da56b4e0ea45bd1923c2d99eb811829643bd679069df97f28a6d84"' :
                                            'id="xs-controllers-links-module-UsersModule-ee5b87acc91b658ce7d5772f02dac01e0d77b97c58e14b0211975008fee3122cb75baed518da56b4e0ea45bd1923c2d99eb811829643bd679069df97f28a6d84"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-ee5b87acc91b658ce7d5772f02dac01e0d77b97c58e14b0211975008fee3122cb75baed518da56b4e0ea45bd1923c2d99eb811829643bd679069df97f28a6d84"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-ee5b87acc91b658ce7d5772f02dac01e0d77b97c58e14b0211975008fee3122cb75baed518da56b4e0ea45bd1923c2d99eb811829643bd679069df97f28a6d84"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-ee5b87acc91b658ce7d5772f02dac01e0d77b97c58e14b0211975008fee3122cb75baed518da56b4e0ea45bd1923c2d99eb811829643bd679069df97f28a6d84"' :
                                        'id="xs-injectables-links-module-UsersModule-ee5b87acc91b658ce7d5772f02dac01e0d77b97c58e14b0211975008fee3122cb75baed518da56b4e0ea45bd1923c2d99eb811829643bd679069df97f28a6d84"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdminUsersController.html" data-type="entity-link" >AdminUsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Session.html" data-type="entity-link" >Session</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ChangePasswordDto.html" data-type="entity-link" >ChangePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserAndSessionTable1767562475194.html" data-type="entity-link" >CreateUserAndSessionTable1767562475194</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponseDto.html" data-type="entity-link" >ErrorResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdDto.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponseDto.html" data-type="entity-link" >LoginResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegistryDates.html" data-type="entity-link" >RegistryDates</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegistryDatesDto.html" data-type="entity-link" >RegistryDatesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegistryDatesOrm.html" data-type="entity-link" >RegistryDatesOrm</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveDto.html" data-type="entity-link" >RemoveDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SessionsDto.html" data-type="entity-link" >SessionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthCookieInterceptor.html" data-type="entity-link" >AuthCookieInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CustomAuth.html" data-type="entity-link" >CustomAuth</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomRequest.html" data-type="entity-link" >CustomRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthService.html" data-type="entity-link" >IAuthService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDevice.html" data-type="entity-link" >IDevice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISessionsService.html" data-type="entity-link" >ISessionsService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISessionWithCurrent.html" data-type="entity-link" >ISessionWithCurrent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUsersService.html" data-type="entity-link" >IUsersService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});