# Generated API Client

This directory contains auto-generated API client code from OpenAPI specifications.

**Do not edit files in this directory manually** - they will be overwritten when regenerating.

## Regenerate API Client

To regenerate the API client after OpenAPI spec changes:

```bash
pnpm openapi
```

## Configuration

API generation is configured in `openapi-ts.config.ts` at the project root.

Default configuration:
- Input: `http://localhost:8080/api-docs`
- Output: `./src/services/generated`
- Client: `@hey-api/client-axios`
- Plugins: TypeScript, Schemas, SDK

To customize, edit the configuration file and update the `input` URL to point to your OpenAPI specification.
