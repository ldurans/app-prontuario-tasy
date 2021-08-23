#!/usr/bin/env python
import os
import sys

from decouple import config

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE",
                          "admissao_uti_back.settings")
    if config('DEBUG', default=True):
        import ptvsd
        import socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.close()
        if os.environ.get('RUN_MAIN') or os.environ.get('WERKZEUG_RUN_MAIN'):
            ptvsd.enable_attach(address=('0.0.0.0', 3000))
            # ptvsd.wait_for_attach()
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
