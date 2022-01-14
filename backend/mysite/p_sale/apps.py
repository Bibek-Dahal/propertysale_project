from django.apps import AppConfig


class PSaleConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'p_sale'

    def ready(self):
        import p_sale.signals
