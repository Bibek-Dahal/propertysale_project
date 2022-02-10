from rest_framework.throttling import AnonRateThrottle

class BurstRateThrottle(AnonRateThrottle):
    scope = 'dj_rest_auth'