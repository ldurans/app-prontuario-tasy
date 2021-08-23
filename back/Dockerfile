FROM python:3.7

# set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV _APP=/opt/services/djangoapp/src

ADD ./config_envs/db/oracle/ /tmp/

ENV ORACLE_HOME=/usr/lib/oracle/12.1/client64
ENV PATH=$PATH:$ORACLE_HOME/bin
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$ORACLE_HOME/lib

# INSTALL TOOLS
RUN apt-get update \
  && apt-get -y install unzip \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y  libldap2-dev libsasl2-dev slapd ldap-utils \
  && apt-get -y install libaio-dev alien \
  && alien -i /tmp/oracle-instantclient-basic.rpm \
  && alien -i /tmp/oracle-instantclient-devel.rpm \
  && alien -i /tmp/oracle-instantclient-sqlplus.rpm \
  && mkdir -p /opt/oracle \
  && ln -snf /usr/lib/oracle/12.1/client64 /opt/oracle \
  && mkdir -p /opt/oracle/network \
  && ln -snf /etc/oracle /opt/oracle/network/admin \
  && apt-get clean && rm -rf /var/cache/apt/* /var/lib/apt/lists/* /tmp/* /var/tmp/*


RUN mkdir -p $_APP 

COPY requirements.txt $_APP/ 
WORKDIR $_APP

RUN pip install --upgrade pip \
  && pip install --upgrade setuptools \
  && pip install -r requirements.txt


RUN useradd -ms /bin/bash dev
COPY --chown=dev:dev . $_APP/
USER dev

RUN python manage.py collectstatic --no-input
CMD ["celery", "-A", "clinico", "worker", "-l", "info", "-P", "gevent"]

# RUN python manage.py collectstatic --no-input
# RUN celery -A clinico worker -l info -P gevent
# EXPOSE 8000
###CMD ["celery", "-A", "clinico", "worker", "-l", "info", "-P", "gevent"]
# CMD ["gunicorn", "--bind", ":8000", "--chdir", "clinico", "clinico.wsgi:application"]
# CMD ["python", "manage.py", "runserver", "localhost:8000"]

