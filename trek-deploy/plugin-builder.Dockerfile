FROM node:22-alpine
RUN apk add --no-cache unzip
WORKDIR /src
CMD ["sh", "-lc", "npx -y trek-plugin-sdk pack /src --out /tmp/ai-travel-handbook.zip && rm -rf /out/* && unzip -q /tmp/ai-travel-handbook.zip -d /out && echo 'AI Travel Handbook plugin packed into /out'" ]
