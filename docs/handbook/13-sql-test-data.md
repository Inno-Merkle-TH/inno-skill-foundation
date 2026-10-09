# 13 — SQL and Test-Data Management

## Outcomes

Find missing and duplicate records without inflating totals.

## Prerequisites

Lesson 12; generated commerce .env exists. Fixture tables qe_* are not live WooCommerce tables.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Primary keys identify rows; joins may multiply them. NULL is not zero. Reconciliation compares eligible business records with valid observations, not raw event counts.

## Worked Example

Fixtures contain 4 orders and 3 events. Eligible total is 59700 minor units; order-b is missing, order-c has one surplus event, order-d is excluded.

## Guided Lab

1. From root start DB: `docker compose --env-file labs/commerce/.env -f labs/commerce/compose.yaml up -d --wait db`.
2. Pipe `labs/tracking/sql/schema.sql` and `seed.sql` into `docker compose --env-file labs/commerce/.env -f labs/commerce/compose.yaml exec -T db sh -c 'MYSQL_PWD="$MARIADB_PASSWORD" mariadb -u commerce commerce'`.
3. Write LEFT JOIN/IS NULL and GROUP BY/HAVING queries; compare with `docs/mentor/sql-answers.sql` only after trying.
4. Use one interactive connection for START TRANSACTION, an update to qe_* and ROLLBACK.

## Expected Results

Counts and total match the known fixture. Repeating seed does not add rows.

## Independent Challenge

Join order items before summing order totals; demonstrate and correct the multiplication error.

## Troubleshooting

Do not issue transaction statements in separate CLI processes. Do not update WooCommerce tables directly or assume HPOS uses wp_posts.

## Completion Checklist

- [ ] Saved queries and actual results.
- [ ] Demonstrated rollback in one connection.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain the eligible denominator.
- [ ] Explain half-open UTC windows and late arrivals.

## Cleanup and Handoff

Retain fixture tables. Start core services with `docker compose up -d --wait` from labs/commerce before web labs.

## References

- [Official/source reading](https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/select)
- [Learning guide](learning-guide.md)

---

[Previous: Docker and Reproducible Commerce Environments](12-docker-environments.md) · [Curriculum](../../README.md) · [Next: API Investigation with Postman](14-postman-api.md)
