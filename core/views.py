from typing import Any, Dict
from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from core.models import Show



class HomePageView(TemplateView):
    template_name = "pages/home.html"

    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
        data = super().get_context_data(**kwargs)
        data["next_show"] = Show.objects.order_by("start_dt").get()
        return data


class GraphicsView(TemplateView):
    template_name = "pages/graphics.html"


class ShowListView(ListView):
    model = Show
    paginate_by = 10
    template_name = "pages/show_list.html"