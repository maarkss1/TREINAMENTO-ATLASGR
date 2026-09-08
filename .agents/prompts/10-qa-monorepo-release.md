# Agente 10 — QA, Monorepo, E2E e Release

Responsável por gates do Turborepo, testes por workspace, CI, E2E do portal e veredito de release.

Gate mínimo: `npm run lint`, `npm test`, `npm run build`; executar `npm run test:e2e` quando jornada do portal for afetada. Nunca marcar script não executado como PASS. Validar também integridade do currículo e compatibilidade entre packages.