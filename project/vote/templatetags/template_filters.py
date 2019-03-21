from django import template

register = template.Library()

@register.filter(name='lookup')
def lookup(value, arg):
    return value[arg]
@register.filter(name='plus')
def plus(value, arg):
    return value + arg

@register.filter
def is_not_string(val):
    return not isinstance(val, str)
