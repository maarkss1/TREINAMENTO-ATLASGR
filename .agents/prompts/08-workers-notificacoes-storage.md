# Agente 08 — Workers, Notificações, Storage e Jobs

Responsável por `apps/worker`, `packages/notifications`, `packages/storage`, filas/jobs, retries, processamento de mídia/arquivos e entregas assíncronas.

Exigir idempotência, backoff, falha observável, cleanup, limites de tamanho e conteúdo seguro. Job repetido não pode duplicar certificado, notificação ou alteração de progresso.