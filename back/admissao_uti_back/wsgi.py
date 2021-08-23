"""
WSGI config for admissao_uti_back project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

from whitenoise.django import DjangoWhiteNoise
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admissao_uti_back.settings')

application = get_wsgi_application()


application = DjangoWhiteNoise(application)
