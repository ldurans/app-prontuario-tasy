"""
Django settings for admissao_uti_back project.

Generated by 'django-admin startproject' using Django 2.1.11.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import datetime
import ldap
from django_auth_ldap.config import LDAPSearch
from django_auth_ldap.config import ActiveDirectoryGroupType

from decouple import config


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# MEDIA_ROOT = BASE_DIR + "/media/"
MEDIA_URL = BASE_DIR + "/media/"

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'e42i32ie*$vb&*kp)8kbv+qp&6d%p7$q7l1lx8g02uq304-&z1'

# CSRF_COOKIE_NAME = 'CLINICO_CSRF'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=True)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*')
CORS_ORIGIN_ALLOW_ALL = config(
    'CORS_ORIGIN_ALLOW_ALL', default=True, cast=bool)
# CORS_URLS_REGEX = r'^/*$'

CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
)

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'admissao',
    'wkhtmltopdf',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # cors
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

AUTHENTICATION_BACKENDS = [
    # "django_auth_ldap.backend.LDAPBackend",
    'admissao_uti_back.auth.UdiLDAPBackend',
    "django.contrib.auth.backends.ModelBackend",
]

AUTH_LDAP_OU = config('AUTH_LDAP_OU', default='')
AUTH_LDAP_SERVER_URI = config('AUTH_LDAP_SERVER_URI', default='')
AUTH_LDAP_ALWAYS_UPDATE_USER = config(
    'AUTH_LDAP_ALWAYS_UPDATE_USER', default='')
AUTH_LDAP_BIND_DN = config('AUTH_LDAP_BIND_DN', default='')
AUTH_LDAP_BIND_PASSWORD = config('AUTH_LDAP_BIND_PASSWORD', default='')
AUTH_LDAP_USER_SEARCH = LDAPSearch(
    AUTH_LDAP_OU, ldap.SCOPE_SUBTREE, "sAMAccountName=%(user)s"
)
AUTH_LDAP_GROUP_SEARCH = LDAPSearch(
    AUTH_LDAP_OU, ldap.SCOPE_SUBTREE, "(objectCategory=Group)"
)
AUTH_LDAP_GROUP_TYPE = ActiveDirectoryGroupType(name_attr="cn")
AUTH_LDAP_USER_FLAGS_BY_GROUP = {
    "is_superuser": f"cn={config('AUTH_LDAP_GROUP', default='GG_Admin_TI')}, {AUTH_LDAP_OU}",
    "is_staff": f"cn={config('AUTH_LDAP_GROUP', default='GG_Admin_TI')}, {AUTH_LDAP_OU}",
}
AUTH_LDAP_FIND_GROUP_PERMS = True
AUTH_LDAP_CACHE_GROUPS = True
AUTH_LDAP_GROUP_CACHE_TIMEOUT = 1  # 1 hour cache

AUTH_LDAP_USER_ATTR_MAP = {
    "username": "sAMAccountName",
    "first_name": "givenName",
    "last_name": "sn"
}

WKHTMLTOPDF_CMD = '/usr/local/bin/wkhtmltopdf'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=3),
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),
    # 'JWT_RESPONSE_PAYLOAD_HANDLER': 'admissao_uti_back.jwt.jwt_response_payload_handler'
}

ROOT_URLCONF = 'admissao_uti_back.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'admissao_uti_back.wsgi.application'


CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": config('REDIS_CACHE_LOCATION', default="redis://localhost:6379/1"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient"
        },
        "KEY_PREFIX": config('REDIS_CACHE_KEY_PREFIX', default="app-prontuario-tasy")
    }
}


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config('PG_DB_NAME', default='udi_app'),
        'USER': config('PG_USER', default='postgres'),
        'PASSWORD': config('PG_PASSWORD', default='marina@0509'),
        'HOST': config('PG_HOST', default='db-udi-app'),
        'PORT': config('PG_PORT', default=5432)
    },
    'udi': {
        'ENGINE':  'django.db.backends.oracle',
        # 'NAME': '192.168.204.200:1521/dbhomol', # DBHOMOL
        # DBTESTE
        'NAME':  config('ORACLE_STRING_CONNECT', default='meudefault:1521/dbhomol'),
        'USER':  config('ORACLE_USER', default='tasy'),
        'PASSWORD':  config('ORACLE_PASSWORD', default='')
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR + '/static/'

if DEBUG:

    INSTALLED_APPS += [
        'debug_toolbar'
    ]
    MIDDLEWARE += [
        'debug_toolbar.middleware.DebugToolbarMiddleware',
    ]
    DEBUG_TOOLBAR_PANELS = [
        'debug_toolbar.panels.versions.VersionsPanel',
        'debug_toolbar.panels.timer.TimerPanel',
        'debug_toolbar.panels.settings.SettingsPanel',
        'debug_toolbar.panels.headers.HeadersPanel',
        'debug_toolbar.panels.request.RequestPanel',
        'debug_toolbar.panels.sql.SQLPanel',
        'debug_toolbar.panels.staticfiles.StaticFilesPanel',
        'debug_toolbar.panels.templates.TemplatesPanel',
        'debug_toolbar.panels.cache.CachePanel',
        'debug_toolbar.panels.signals.SignalsPanel',
        'debug_toolbar.panels.logging.LoggingPanel',
        'debug_toolbar.panels.redirects.RedirectsPanel',
    ]

    # import socket

    def show_toolbar(request):
        return True
    # INTERNAL_IPS = ('127.0.0.1', '::1',
    #                 'localhost', '172.19.0.2', '172.19.0.1',)

    # DEBUG_TOOLBAR_CONFIG = {
    #     'INTERCEPT_REDIRECTS': False,
    #     'SHOW_TOOLBAR_CALLBACK': show_toolbar
    # }

    # DEBUG_TOOLBAR_CONFIG = {
    #     'INTERCEPT_REDIRECTS': False,
    #     'SHOW_TOOLBAR_CALLBACK': True
    # }