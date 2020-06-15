# People Finder

API which returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

## Getting Started

If you have docker installed, you can run `docker-compose up` to build and run the app.

Alternatively, you can run locally without redis:

1. `npm i`
2. `npm run dev`

### Running Tests

`npm run test`

## Technical Considerations

- API Documentation :x:
  - Swagger considered but there is no API contract and the endpoint is already simple enough
- Caching :white_check_mark:
- Circuit Breaker :white_check_mark:
- Docker :white_check_mark:
- Error Handling :white_check_mark:
- Logging :x:
  - Would implement Winston when necessary
- OWASP :x:
  - No API Contract specified but if in production could consider an API Key and Rate limiting
- Process manager :x:
  - PM2 considered but was not part of requirements
- Twelve Factor App :eight_spoked_asterisk:
  - Has been considered and relevant practices applied
