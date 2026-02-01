import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './src/services/swagger.json',
  output: {
    path: './src/services/generated',
  },
  plugins: [
    {
      name: '@hey-api/client-axios',
      runtimeConfigPath: '~/lib/hey-api',
    },
    '@hey-api/schemas',
    {
      name: '@hey-api/sdk',
      // 使用新的 operations API
      operations: {
        nesting: 'id', // 使用自定义的方法名生成规则
        transform: (operation: any) => {
          const { method, path } = operation;

          // 生成自定义的方法名
          const cleanPath = path.replace(/^\//, '');
          const segments = cleanPath.split('/');

          const processedSegments = segments.map((segment: string, index: number) => {
            // 处理路径参数 {id} -> ById
            if (segment.startsWith('{') && segment.endsWith('}')) {
              const param = segment.slice(1, -1);
              const camelParam = param.replace(/[-_](.)/g, (_: any, c: string) => c.toUpperCase());
              return `By${camelParam.charAt(0).toUpperCase() + camelParam.slice(1)}`;
            }

            // 转换为驼峰
            const camelSegment = segment.replace(/[-_](.)/g, (_: any, c: string) => c.toUpperCase());
            return index === 0 ? camelSegment : camelSegment.charAt(0).toUpperCase() + camelSegment.slice(1);
          });

          const customName = method + processedSegments.map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('');

          return {
            ...operation,
            id: customName,
          };
        },
      },
    },
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    '@tanstack/react-query',
  ],
});
