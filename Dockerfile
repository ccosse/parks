FROM django:python2-onbuild

RUN \
  mkdir -p /var/www/dev/pacmap && touch /var/www/dev/pacmap/pacmap.log && \
  mkdir -p /var/www/dev/static/pacmap/upload/images/
